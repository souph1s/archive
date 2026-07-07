/**
 * IMAGE SERVICE
 * ─────────────────────────────────────────────────────────────
 * Central abstraction for all image retrieval.
 * Components never import image URLs directly — they always
 * call this service. Swapping image source rules = one file change.
 *
 * Resolution order per artifact/designer/movement:
 *   1. Check in-memory cache
 *   2. Look up imageRegistry
 *   3. Use /public file when available
 *   4. Otherwise return contextual SVG placeholder
 */

import {
  ImageRecord,
  ImageSource,
  artifactImages,
  designerImages,
  movementImages,
  materialImages,
} from './imageRegistry';

// ─── Resolved image result ───────────────────────────────────
export interface ResolvedImage {
  url: string;
  alt: string;
  credit?: string;
  width?: number;
  height?: number;
  isPlaceholder: boolean;
}

export interface ResolvedGallery {
  primary: ResolvedImage;
  gallery: ResolvedImage[];
}

// ─── In-memory cache ─────────────────────────────────────────
const cache = new Map<string, ResolvedImage>();
const pending = new Map<string, Promise<ResolvedImage>>();

/** Resolve a single ImageRecord entry to a URL string */
function resolveRecordUrl(record: { source: ImageSource; file?: string }): string {
  switch (record.source) {
    case 'local':
      if (!record.file) throw new Error('No file for local image source');
      return `${process.env.PUBLIC_URL || ''}/${encodeURIComponent(record.file)}`;

    case 'placeholder':
      throw new Error('Placeholder image requested');

    default:
      throw new Error(`Unknown image source: ${record.source}`);
  }
}

// ─── Placeholder generator ────────────────────────────────────
function escapeSvgText(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function makePlaceholder(alt: string, color = '#1a1a1a', accentColor = '#FF4D00'): ResolvedImage {
  // SVG data URI placeholder — keeps layout stable, matches visual language
  const initials = alt
    .split(' ')
    .slice(0, 2)
    .map(w => w[0] || '')
    .join('')
    .toUpperCase();

  const safeAlt = escapeSvgText(alt);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="${color}"/>
    <rect x="0" y="0" width="800" height="2" fill="${accentColor}" opacity="0.4"/>
    <rect x="0" y="598" width="800" height="2" fill="${accentColor}" opacity="0.4"/>
    <rect x="0" y="0" width="2" height="600" fill="${accentColor}" opacity="0.4"/>
    <rect x="798" y="0" width="2" height="600" fill="${accentColor}" opacity="0.4"/>
    <text x="400" y="280" font-family="Space Grotesk, Arial Black, sans-serif" font-size="120" font-weight="700" fill="${accentColor}" opacity="0.12" text-anchor="middle" dominant-baseline="middle" letter-spacing="-8">${initials}</text>
    <text x="400" y="324" font-family="Space Mono, monospace" font-size="14" fill="${accentColor}" opacity="0.5" text-anchor="middle" letter-spacing="3">IMAGEM A SER COLOCADA</text>
    <text x="400" y="358" font-family="Space Grotesk, Arial, sans-serif" font-size="24" font-weight="700" fill="#F5F5F0" opacity="0.72" text-anchor="middle">${safeAlt}</text>
  </svg>`;

  return {
    url: `data:image/svg+xml,${encodeURIComponent(svg)}`,
    alt,
    isPlaceholder: true,
  };
}

// ─── Core resolver ────────────────────────────────────────────
async function resolveImage(
  cacheKey: string,
  record: ImageRecord,
  placeholderColor?: string,
  placeholderAccent?: string,
): Promise<ResolvedImage> {
  // 1. Memory cache hit
  if (cache.has(cacheKey)) return cache.get(cacheKey)!;

  // 2. Deduplicate in-flight requests
  if (pending.has(cacheKey)) return pending.get(cacheKey)!;

  const promise = (async (): Promise<ResolvedImage> => {
    try {
      const url = resolveRecordUrl(record);
      const resolved: ResolvedImage = {
        url,
        alt: record.alt,
        credit: record.credit,
        isPlaceholder: false,
      };
      cache.set(cacheKey, resolved);
      return resolved;
    } catch (err) {
      // Try gallery fallbacks if primary fails
      for (const fallback of record.gallery || []) {
        try {
          const url = resolveRecordUrl(fallback);
          const resolved: ResolvedImage = {
            url,
            alt: fallback.alt,
            credit: fallback.credit,
            isPlaceholder: false,
          };
          cache.set(cacheKey, resolved);
          return resolved;
        } catch {
          // continue to next fallback
        }
      }
      // All sources failed — return placeholder
      const placeholder = makePlaceholder(record.alt, placeholderColor, placeholderAccent);
      cache.set(cacheKey, placeholder);
      return placeholder;
    } finally {
      pending.delete(cacheKey);
    }
  })();

  pending.set(cacheKey, promise);
  return promise;
}

// ─── Gallery resolver ─────────────────────────────────────────
async function resolveGallery(
  baseKey: string,
  record: ImageRecord,
  placeholderColor?: string,
  placeholderAccent?: string,
): Promise<ResolvedGallery> {
  const primary = await resolveImage(baseKey, record, placeholderColor, placeholderAccent);

  const galleryPromises = (record.gallery || []).map((item, i) =>
    resolveImage(`${baseKey}_gallery_${i}`, { ...item, gallery: [] } as ImageRecord, placeholderColor, placeholderAccent)
  );
  const gallery = await Promise.allSettled(galleryPromises).then(results =>
    results
      .filter((r): r is PromiseFulfilledResult<ResolvedImage> => r.status === 'fulfilled')
      .map(r => r.value)
  );

  return { primary, gallery };
}

// ─── Public API ───────────────────────────────────────────────

export const imageService = {
  /**
   * Get the primary image for a design artifact.
   * @param artifactId  matches the id field in artifacts data
   */
  async getArtifactImage(artifactId: string): Promise<ResolvedImage> {
    const record = artifactImages[artifactId];
    if (!record) return makePlaceholder(`Artifact: ${artifactId}`);
    return resolveImage(`artifact_${artifactId}`, record, '#111', '#FF4D00');
  },

  /**
   * Get full gallery for an artifact (primary + secondary images).
   */
  async getArtifactGallery(artifactId: string): Promise<ResolvedGallery> {
    const record = artifactImages[artifactId];
    if (!record) {
      const ph = makePlaceholder(`Artifact: ${artifactId}`);
      return { primary: ph, gallery: [] };
    }
    return resolveGallery(`artifact_${artifactId}`, record, '#111', '#FF4D00');
  },

  /**
   * Get the primary image for a designer.
   * @param designerId  matches the id field in designers data
   */
  async getDesignerImage(designerId: string): Promise<ResolvedImage> {
    const record = designerImages[designerId];
    if (!record) return makePlaceholder(`Designer: ${designerId}`, '#0A0A0A', '#0028FF');
    return resolveImage(`designer_${designerId}`, record, '#0A0A0A', '#0028FF');
  },

  /**
   * Get full gallery for a designer.
   */
  async getDesignerGallery(designerId: string): Promise<ResolvedGallery> {
    const record = designerImages[designerId];
    if (!record) {
      const ph = makePlaceholder(`Designer: ${designerId}`, '#0A0A0A', '#0028FF');
      return { primary: ph, gallery: [] };
    }
    return resolveGallery(`designer_${designerId}`, record, '#0A0A0A', '#0028FF');
  },

  /**
   * Get the primary image for a design movement.
   * @param movementId  matches the id field in movements data
   */
  async getMovementImage(movementId: string): Promise<ResolvedImage> {
    const record = movementImages[movementId];
    if (!record) return makePlaceholder(`Movement: ${movementId}`, '#111', '#E8FF00');
    return resolveImage(`movement_${movementId}`, record, '#111', '#E8FF00');
  },

  /**
   * Get full gallery for a movement.
   */
  async getMovementGallery(movementId: string): Promise<ResolvedGallery> {
    const record = movementImages[movementId];
    if (!record) {
      const ph = makePlaceholder(`Movement: ${movementId}`, '#111', '#E8FF00');
      return { primary: ph, gallery: [] };
    }
    return resolveGallery(`movement_${movementId}`, record, '#111', '#E8FF00');
  },

  /**
   * Get the primary image for a material.
   * @param materialId  matches the id field in materials data
   */
  async getMaterialImage(materialId: string): Promise<ResolvedImage> {
    const record = materialImages[materialId];
    if (!record) return makePlaceholder(`Material: ${materialId}`, '#1a1a1a', '#C0C0C0');
    return resolveImage(`material_${materialId}`, record, '#1a1a1a', '#C0C0C0');
  },

  /**
   * Prefetch a list of images in the background (e.g. on index pages).
   * Fire and forget — errors are silent.
   */
  prefetch(type: 'artifact' | 'designer' | 'movement' | 'material', ids: string[]): void {
    ids.forEach(id => {
      switch (type) {
        case 'artifact': this.getArtifactImage(id).catch(() => {}); break;
        case 'designer': this.getDesignerImage(id).catch(() => {}); break;
        case 'movement': this.getMovementImage(id).catch(() => {}); break;
        case 'material': this.getMaterialImage(id).catch(() => {}); break;
      }
    });
  },

  /** Clear the in-memory cache (useful in dev / testing) */
  clearCache(): void {
    cache.clear();
  },

  /** Return cache stats */
  getCacheStats(): { size: number; pending: number } {
    return { size: cache.size, pending: pending.size };
  },
};
