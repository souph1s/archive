/**
 * IMAGE REGISTRY
 * ─────────────────────────────────────────────────────────────
 * Local image manifest for files in /public.
 *
 * Use source: 'local' when the file already exists in public.
 * Use source: 'placeholder' when an image still needs to be added.
 */

export type ImageSource = 'local' | 'placeholder';

export interface ImageRecord {
  /** Local asset or explicit missing-image marker */
  source: ImageSource;
  /** File name inside /public when source === 'local' */
  file?: string;
  /** Alt text and placeholder request text */
  alt: string;
  /** Optional credit line shown by image components */
  credit?: string;
  /** Multiple images for gallery */
  gallery?: Array<{ source: ImageSource; file?: string; alt: string; credit?: string }>;
}

const missing = (alt: string): ImageRecord => ({ source: 'placeholder', alt });
const local = (file: string, alt: string, credit = 'Local image'): ImageRecord => ({
  source: 'local',
  file,
  alt,
  credit,
});

// ─────────────────────────────────────────────────────────────
// ARTIFACTS
// ─────────────────────────────────────────────────────────────
export const artifactImages: Record<string, ImageRecord> = {
  'eames-lounge-chair': local('eames-lounge-chair.jpg', 'Eames Lounge Chair'),
  'barcelona-chair': local('barcelona-chair.jpg', 'Barcelona Chair'),
  'wassily-chair': local('wassily-chair.jpeg', 'Wassily Chair'),
  'egg-chair': local('egg-chair.jpg', 'Egg Chair'),
  'panton-chair': local('panton-chair.webp', 'Panton Chair'),
  'tulip-chair': local('tulip-chair.jpg', 'Tulip Chair'),
  'wishbone-chair': local('wishbone-chair.webp', 'Wishbone Chair'),
  'arco-lamp': local('arco-lamp.jpg', 'Arco Lamp'),
  'noguchi-table': local('noguchi-table.webp', 'Noguchi Coffee Table'),
  'tulip-table': local('tulip-table.webp', 'Tulip Table'),
  'diamond-chair': local('diamond-chair.jpg', 'Diamond Chair'),
  'series-7-chair': local('series-7-chair.ashx', 'Series 7 Chair'),
  'cesca-chair': local('cesca-chair.jpeg', 'Cesca Chair'),
  'togo-sofa': local('togo-sofa.webp', 'Togo Sofa'),
  'lc2-sofa': local('lc2-sofa.webp', 'LC2 Petit Confort'),
  'platner-table': local('platner-table.jpeg', 'Platner Coffee Table'),
};

// ─────────────────────────────────────────────────────────────
// DESIGNERS
// ─────────────────────────────────────────────────────────────
export const designerImages: Record<string, ImageRecord> = {
  'charles-ray-eames': local('charlesandraueames.jpg', 'Charles and Ray Eames'),
  'arne-jacobsen': local('arne-jacobsen.jpg', 'Arne Jacobsen'),
  'dieter-rams': local('Dieterrams.jpg', 'Dieter Rams'),
  'verner-panton': local('vernerpanton.jpeg', 'Verner Panton'),
  'eero-saarinen': local('Eero Saarinen.webp', 'Eero Saarinen'),
  'achille-castiglioni': local('Achille Castiglioni.webp', 'Achille Castiglioni'),
  'hans-wegner': local('Hans Wegner.jpeg', 'Hans Wegner'),
  'isamu-noguchi': local('isamu_noguchi.webp', 'Isamu Noguchi'),
  'florence-knoll': local('Florence Knoll.jpg', 'Florence Knoll'),
  'harry-bertoia': local('Harry Bertoia.jpg', 'Harry Bertoia'),
  'marcel-breuer': local('Marcel Breuer.jpeg', 'Marcel Breuer'),
  'le-corbusier': missing('Adicionar imagem: Le Corbusier'),
  'mies-van-der-rohe': missing('Adicionar imagem: Ludwig Mies van der Rohe'),
};

// ─────────────────────────────────────────────────────────────
// MOVEMENTS
// ─────────────────────────────────────────────────────────────
export const movementImages: Record<string, ImageRecord> = {
  'arts-crafts': missing('Adicionar imagem: Arts & Crafts'),
  'bauhaus': missing('Adicionar imagem: Bauhaus'),
  'modernism': missing('Adicionar imagem: Modernism'),
  'mid-century-modern': missing('Adicionar imagem: Mid-Century Modern'),
  'scandinavian-modern': missing('Adicionar imagem: Scandinavian Modern'),
  'italian-radical-design': missing('Adicionar imagem: Italian Radical Design'),
  'memphis-milano': missing('Adicionar imagem: Memphis Milano'),
  'minimalism': missing('Adicionar imagem: Minimalism'),
  'contemporary-design': missing('Adicionar imagem: Contemporary Design'),
};

// ─────────────────────────────────────────────────────────────
// MATERIALS
// ─────────────────────────────────────────────────────────────
export const materialImages: Record<string, ImageRecord> = {
  'molded-plywood': missing('Adicionar imagem: Molded Plywood'),
  'tubular-steel': missing('Adicionar imagem: Tubular Steel'),
  'fiberglass': missing('Adicionar imagem: Fiberglass'),
  'leather': missing('Adicionar imagem: Leather'),
  'polypropylene': missing('Adicionar imagem: Polypropylene'),
  'marble': missing('Adicionar imagem: Marble'),
  'bentwood': missing('Adicionar imagem: Bentwood'),
  'aluminum': missing('Adicionar imagem: Aluminum'),
};

export const missingImageChecklist = {
  artifacts: Object.entries(artifactImages)
    .filter(([, image]) => image.source === 'placeholder')
    .map(([id, image]) => ({ id, label: image.alt.replace('Adicionar imagem: ', '') })),
  designers: Object.entries(designerImages)
    .filter(([, image]) => image.source === 'placeholder')
    .map(([id, image]) => ({ id, label: image.alt.replace('Adicionar imagem: ', '') })),
  movements: Object.entries(movementImages)
    .filter(([, image]) => image.source === 'placeholder')
    .map(([id, image]) => ({ id, label: image.alt.replace('Adicionar imagem: ', '') })),
  materials: Object.entries(materialImages)
    .filter(([, image]) => image.source === 'placeholder')
    .map(([id, image]) => ({ id, label: image.alt.replace('Adicionar imagem: ', '') })),
};
