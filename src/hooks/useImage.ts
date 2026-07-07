/**
 * IMAGE HOOKS
 * ─────────────────────────────────────────────────────────────
 * React hooks that wrap imageService with loading/error states.
 * Components import these hooks, never imageService directly.
 */

import { useState, useEffect, useRef } from 'react';
import { imageService, ResolvedImage, ResolvedGallery } from '../services/imageService';

export type ImageStatus = 'loading' | 'ready' | 'placeholder';

export interface UseImageResult {
  url: string;
  alt: string;
  credit?: string;
  status: ImageStatus;
  isPlaceholder: boolean;
}

export interface UseGalleryResult {
  primary: UseImageResult;
  gallery: UseImageResult[];
  status: ImageStatus;
}

// ─── Single image hook ────────────────────────────────────────
export function useArtifactImage(artifactId: string): UseImageResult {
  return useImage(() => imageService.getArtifactImage(artifactId), artifactId);
}

export function useDesignerImage(designerId: string): UseImageResult {
  return useImage(() => imageService.getDesignerImage(designerId), designerId);
}

export function useMovementImage(movementId: string): UseImageResult {
  return useImage(() => imageService.getMovementImage(movementId), movementId);
}

export function useMaterialImage(materialId: string): UseImageResult {
  return useImage(() => imageService.getMaterialImage(materialId), materialId);
}

// ─── Gallery hooks ─────────────────────────────────────────────
export function useArtifactGallery(artifactId: string): UseGalleryResult {
  return useGallery(() => imageService.getArtifactGallery(artifactId), artifactId);
}

export function useDesignerGallery(designerId: string): UseGalleryResult {
  return useGallery(() => imageService.getDesignerGallery(designerId), designerId);
}

export function useMovementGallery(movementId: string): UseGalleryResult {
  return useGallery(() => imageService.getMovementGallery(movementId), movementId);
}

// ─── Internal generic hooks ───────────────────────────────────
const LOADING_PLACEHOLDER: UseImageResult = {
  url: '',
  alt: '',
  status: 'loading',
  isPlaceholder: true,
};

function useImage(
  fetcher: () => Promise<ResolvedImage>,
  key: string,
): UseImageResult {
  const [result, setResult] = useState<UseImageResult>(LOADING_PLACEHOLDER);
  const mounted = useRef(true);
  const lastKey = useRef<string>('');

  useEffect(() => {
    mounted.current = true;
    if (lastKey.current === key) return;
    lastKey.current = key;

    setResult(LOADING_PLACEHOLDER);

    fetcher().then(img => {
      if (!mounted.current) return;
      setResult({
        url: img.url,
        alt: img.alt,
        credit: img.credit,
        status: img.isPlaceholder ? 'placeholder' : 'ready',
        isPlaceholder: img.isPlaceholder,
      });
    }).catch(() => {
      if (!mounted.current) return;
      setResult({
        url: '',
        alt: 'Image unavailable',
        status: 'placeholder',
        isPlaceholder: true,
      });
    });

    return () => { mounted.current = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return result;
}

function useGallery(
  fetcher: () => Promise<ResolvedGallery>,
  key: string,
): UseGalleryResult {
  const [result, setResult] = useState<UseGalleryResult>({
    primary: LOADING_PLACEHOLDER,
    gallery: [],
    status: 'loading',
  });
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    setResult({ primary: LOADING_PLACEHOLDER, gallery: [], status: 'loading' });

    fetcher().then(g => {
      if (!mounted.current) return;
      const toResult = (img: ResolvedImage): UseImageResult => ({
        url: img.url,
        alt: img.alt,
        credit: img.credit,
        status: img.isPlaceholder ? 'placeholder' : 'ready',
        isPlaceholder: img.isPlaceholder,
      });
      setResult({
        primary: toResult(g.primary),
        gallery: g.gallery.map(toResult),
        status: g.primary.isPlaceholder ? 'placeholder' : 'ready',
      });
    }).catch(() => {
      if (!mounted.current) return;
      setResult({ primary: LOADING_PLACEHOLDER, gallery: [], status: 'placeholder' });
    });

    return () => { mounted.current = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return result;
}
