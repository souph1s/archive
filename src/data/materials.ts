export interface Material {
  id: string;
  name: string;
  color: string;
  accent: string;
  tagline: string;
  history: string;
  manufacturing: string;
  advantages: string[];
  famousObjects: string[];
  famousDesigners: string[];
  era: string;
}

export const materials: Material[] = [
  {
    id: 'molded-plywood',
    name: 'Molded Plywood',
    color: '#8B6914',
    accent: '#F5F5F0',
    tagline: 'The material that made organic mass-production possible.',
    era: '1940s–present',
    history: 'Plywood\'s potential for three-dimensional forming was first explored at scale by Charles and Ray Eames during WWII, when they produced molded plywood leg splints for the US Navy. The techniques they developed became the foundation for their furniture revolution.',
    manufacturing: 'Thin wood veneers are cross-layered and bonded with adhesive. When placed in a heated mold under pressure, the assembly conforms to complex curves. The heat activates the adhesive while the pressure locks the form.',
    advantages: ['Organic curves impossible in solid wood', 'Structural strength exceeding solid wood of same thickness', 'Consistent material properties', 'Can be mass-produced with precision'],
    famousObjects: ['Eames LCW', 'Eames DCW', 'Eames Lounge Chair shells', 'Series 7 Chair', 'Ant Chair'],
    famousDesigners: ['Charles & Ray Eames', 'Arne Jacobsen', 'Alvar Aalto'],
  },
  {
    id: 'tubular-steel',
    name: 'Tubular Steel',
    color: '#6A6A6A',
    accent: '#F5F5F0',
    tagline: 'Bicycle handlebars changed furniture history.',
    era: '1925–present',
    history: 'Marcel Breuer\'s observation that his Adler bicycle handlebars were both light and strong triggered the tubular steel furniture revolution. By 1926 he had bent steel into the first furniture of its kind at the Bauhaus. The material became the symbol of a new industrial modernity.',
    manufacturing: 'Seamless steel tube is bent using mandrel bending — an internal rod prevents the tube from collapsing. The tube is then chrome-plated or powder-coated. Joints can be welded or use mechanical fittings.',
    advantages: ['High strength-to-weight ratio', 'Can be bent to precise angles', 'Chrome finish is both durable and beautiful', 'Allows cantilevered forms impossible in wood'],
    famousObjects: ['Wassily Chair', 'Cesca Chair', 'Barcelona Chair', 'LC2 Sofa', 'Arco Lamp base'],
    famousDesigners: ['Marcel Breuer', 'Mies van der Rohe', 'Le Corbusier', 'Mart Stam'],
  },
  {
    id: 'fiberglass',
    name: 'Fiberglass',
    color: '#2E86AB',
    accent: '#F5F5F0',
    tagline: 'The shell material. Organic form at industrial scale.',
    era: '1950s–present',
    history: 'Developed for military applications during WWII, fiberglass was first applied to furniture by Charles Eames, who won a MoMA competition in 1948 with his fiberglass shell chairs. The material allowed complex organic curves to be manufactured consistently and affordably.',
    manufacturing: 'Glass fibers are woven into a mat and impregnated with polyester or epoxy resin. When placed in a mold and cured under heat, the composite hardens to a rigid shell. The result is light, strong and capable of holding complex curves.',
    advantages: ['Complex organic forms impossible in metal or wood', 'Light weight with high structural rigidity', 'Color can be molded in — no need to paint', 'Highly resistant to cracking and fatigue'],
    famousObjects: ['Eames Plastic Armchair', 'Egg Chair', 'Tulip Chair', 'Coconut Chair'],
    famousDesigners: ['Charles & Ray Eames', 'Eero Saarinen', 'George Nelson', 'Arne Jacobsen'],
  },
  {
    id: 'leather',
    name: 'Leather',
    color: '#5C3A1E',
    accent: '#F5F5F0',
    tagline: 'The oldest luxury material. Still irreplaceable.',
    era: 'Ancient–present',
    history: 'Leather has been used in furniture for millennia, but modernist designers elevated it to an art form. The Eames Lounge Chair\'s hand-selected, matched-grain leather panels are perhaps the most celebrated use of the material in 20th century design.',
    manufacturing: 'Hides are tanned (vegetable or chrome process), then dried, graded and split to consistent thickness. For premium furniture, panels are hand-selected for grain consistency, cut by hand or CNC, and stitched by skilled craftspeople.',
    advantages: ['Develops character and patina with age', 'Highly durable with proper care', 'Temperature-regulating properties', 'Available in enormous range of treatments and finishes'],
    famousObjects: ['Eames Lounge Chair', 'Barcelona Chair', 'Le Corbusier LC2', 'Florence Knoll Sofa'],
    famousDesigners: ['Charles & Ray Eames', 'Mies van der Rohe', 'Le Corbusier', 'Florence Knoll'],
  },
  {
    id: 'polypropylene',
    name: 'Polypropylene',
    color: '#FF4D00',
    accent: '#0A0A0A',
    tagline: 'One piece. One mold. One material. The democratization of form.',
    era: '1960s–present',
    history: 'Verner Panton\'s obsession with creating a single-piece chair led him to polypropylene — a thermoplastic that could flow into a two-part mold and emerge as a continuous form with no joints. It took nearly a decade before manufacturing technology caught up with his vision.',
    manufacturing: 'Polypropylene pellets are melted and injected into a two-part aluminum mold at high pressure. The plastic cools and is ejected as a complete form. Each cycle takes minutes. The same mold can produce millions of identical pieces.',
    advantages: ['No joints or assembly required', 'Consistent production quality', 'Extremely cost-effective at scale', 'Fully recyclable', 'Available in unlimited colors'],
    famousObjects: ['Panton Chair', 'Monobloc Chair', 'Magis Spun Chair', 'Kartell Louis Ghost'],
    famousDesigners: ['Verner Panton', 'Philippe Starck', 'Marc Newson', 'Konstantin Grcic'],
  },
  {
    id: 'marble',
    name: 'Marble',
    color: '#D4D4D4',
    accent: '#0A0A0A',
    tagline: 'The most ancient luxury, used with radical modernity.',
    era: 'Ancient–present',
    history: 'Marble\'s role in modern design is counterintuitive — it is the oldest prestige material, yet modernist designers used it in radically new ways. Mies van der Rohe\'s Barcelona Pavilion used Tinos Green marble as a planar wall surface. The Castiglioni brothers used it as counterweight.',
    manufacturing: 'Quarried in massive blocks using wire saws and diamond-tipped tools, then cut to slabs by gang saws. Surface finish is achieved through increasingly fine abrasives, from rough grinding to mirror polishing with tin oxide.',
    advantages: ['Extraordinary visual variety — no two pieces identical', 'Exceptional hardness and durability', 'Natural thermal mass properties', 'Responds beautifully to polishing'],
    famousObjects: ['Arco Lamp base', 'Barcelona Pavilion walls', 'Platner Table top', 'Noguchi tables'],
    famousDesigners: ['Achille Castiglioni', 'Mies van der Rohe', 'Warren Platner', 'Isamu Noguchi'],
  },
  {
    id: 'bentwood',
    name: 'Bentwood',
    color: '#8B5E3C',
    accent: '#F5F5F0',
    tagline: 'Steam, pressure, and time — bending nature to form.',
    era: '1840s–present',
    history: 'Michael Thonet patented steam-bending of solid wood in 1856, creating the first system for mass-producing furniture from a single continuous material with minimal waste. His Chair No. 14 — the "Vienna Café Chair" — became the first globally distributed design object, with 50 million sold by 1930.',
    manufacturing: 'Solid wood rods are steamed until pliable — typically 30-60 minutes per centimeter of thickness. The softened wood is then bent around a form and clamped until it cools and dries. The bend is permanent once the wood dries.',
    advantages: ['No glue required at the bend', 'Extremely strong at the curve', 'Minimal material waste', 'Natural, warm aesthetic'],
    famousObjects: ['Thonet Chair No. 14', 'Wishbone Chair back bow', 'Breuer Cesca Chair elements', 'Aalto Stool 60'],
    famousDesigners: ['Michael Thonet', 'Hans Wegner', 'Alvar Aalto', 'Marcel Breuer'],
  },
  {
    id: 'aluminum',
    name: 'Aluminum',
    color: '#A0A8B0',
    accent: '#0A0A0A',
    tagline: 'The aerospace metal that came home.',
    era: '1920s–present',
    history: 'Originally an aerospace material, aluminum entered furniture design gradually — first as structural frames, then as die-cast bases (Tulip Chair, Eames Lounge Chair ottoman base), then as primary structure. Its lightness-to-strength ratio has made it essential in contemporary furniture.',
    manufacturing: 'Aluminum can be die-cast (liquid metal forced into a steel mold), extruded (forced through a die to create continuous profiles), or machined from solid billet. Each process creates different characteristics — die-casting for complex shapes, extrusion for uniform profiles.',
    advantages: ['Exceptional strength-to-weight ratio', 'Naturally corrosion-resistant', 'Can be anodized in a range of colors', 'Recyclable with no quality degradation'],
    famousObjects: ['Eames Lounge Chair base', 'Tulip Chair pedestal', 'Eames Aluminum Group', 'USM Haller connectors'],
    famousDesigners: ['Charles & Ray Eames', 'Eero Saarinen', 'Fritz Haller'],
  },
];

export const getMaterialById = (id: string) => materials.find(m => m.id === id);
