export interface Movement {
  id: string;
  name: string;
  period: string;
  origin: string;
  color: string;
  accent: string;
  tagline: string;
  context: string;
  principles: string[];
  visual: string[];
  designers: string[];
  objects: string[];
  legacy: string;
}

export const movements: Movement[] = [
  {
    id: 'arts-crafts',
    name: 'Arts & Crafts',
    period: '1860–1910',
    origin: 'England',
    color: '#7B5E4A',
    accent: '#F5F5F0',
    tagline: 'A rebellion against the machine. A return to the hand.',
    context: 'Born from John Ruskin and William Morris\'s horror at industrial mass production, Arts & Crafts was the first design movement to question the relationship between making and meaning. It argued that a society\'s objects reflected its soul — and that factory production had damaged both.',
    principles: ['Honesty of materials', 'Handcraft over machine production', 'Unity of art and life', 'Social responsibility in design', 'Truth to nature'],
    visual: ['Natural materials — oak, leather, copper', 'Visible joinery and construction', 'Floral and organic motifs', 'Muted earthy color palettes', 'Functional simplicity'],
    designers: ['William Morris', 'Charles Rennie Mackintosh', 'Gustav Stickley', 'C.F.A. Voysey'],
    objects: ['Morris & Co. textiles', 'Stickley furniture', 'Liberty of London fabrics'],
    legacy: 'Directly inspired Art Nouveau, the Bauhaus and the Scandinavian craft traditions. Still visible today in the maker movement and contemporary craft design.',
  },
  {
    id: 'bauhaus',
    name: 'Bauhaus',
    period: '1919–1933',
    origin: 'Germany',
    color: '#E8FF00',
    accent: '#0A0A0A',
    tagline: 'Art and industry, fused. The school that changed everything.',
    context: 'Founded by Walter Gropius in Weimar in 1919, the Bauhaus sought to dissolve the boundary between fine art and industrial craft. It trained artists who could design for mass production — creating objects of aesthetic quality that could reach everyone. Closed by the Nazis in 1933, its faculty scattered across the world and carried its ideas everywhere.',
    principles: ['Art and craft as one discipline', 'Form follows function', 'Design for industrial production', 'Universal formal language', 'Learning by making'],
    visual: ['Primary colors — red, yellow, blue', 'Basic geometric forms', 'Honest industrial materials', 'Asymmetric typography', 'Black, white and grey neutrals'],
    designers: ['Walter Gropius', 'Marcel Breuer', 'László Moholy-Nagy', 'Herbert Bayer', 'Mies van der Rohe', 'Marianne Brandt'],
    objects: ['Wassily Chair', 'Cesca Chair', 'Bauhaus typography', 'MT8 table lamp by Brandt'],
    legacy: 'The Bauhaus is the most influential school in design history. Its methods, philosophy and graduates shaped graphic design, product design, architecture, typography and art education worldwide.',
  },
  {
    id: 'modernism',
    name: 'Modernism',
    period: '1920–1970',
    origin: 'International',
    color: '#0028FF',
    accent: '#F5F5F0',
    tagline: 'A new world required new objects. No ornament. No history.',
    context: 'Modernism in design emerged from the belief that the industrial age demanded a completely new visual language — one purged of historical ornament and sentimental reference. It was utopian, rational and international: the same principles could produce a house in Chicago or a chair in Berlin.',
    principles: ['Truth to materials', 'Elimination of ornament', 'Structural honesty', 'Universality over nationality', 'The machine aesthetic'],
    visual: ['White surfaces and open plans', 'Steel and glass', 'Geometric precision', 'Absence of decoration', 'Floating forms'],
    designers: ['Mies van der Rohe', 'Le Corbusier', 'Walter Gropius', 'Marcel Breuer', 'Charlotte Perriand'],
    objects: ['Barcelona Chair', 'LC2 Sofa', 'Farnsworth House', 'Barcelona Pavilion'],
    legacy: 'Modernism became the dominant language of 20th century architecture and design, and its influence persists in everything from airport terminals to iPhone packaging.',
  },
  {
    id: 'mid-century-modern',
    name: 'Mid-Century Modern',
    period: '1945–1969',
    origin: 'USA',
    color: '#FF4D00',
    accent: '#0A0A0A',
    tagline: 'Optimism in plywood. Beauty in plastic. Freedom in form.',
    context: 'Post-war America was building a new world, and it needed new objects to fill it. The GI Bill sent millions to college, the suburbs expanded rapidly, and a new consumer class emerged with money and appetite for modern design. Designers like the Eameses, Saarinen and Bertoia embraced new materials and processes to create furniture that was democratic, beautiful and genuinely new.',
    principles: ['Organic form over geometric rigidity', 'New materials — plywood, fiberglass, plastic', 'Integration of art and industry', 'Accessible beauty — design for everyone', 'Indoor-outdoor integration'],
    visual: ['Tapered legs and floating forms', 'Warm woods and vibrant upholstery', 'Biomorphic curves', 'Sunburst patterns and atomic imagery', 'Open floor plans'],
    designers: ['Charles & Ray Eames', 'Eero Saarinen', 'Harry Bertoia', 'George Nelson', 'Isamu Noguchi'],
    objects: ['Eames Lounge Chair', 'Tulip Chair', 'Diamond Chair', 'Noguchi Table'],
    legacy: 'Mid-Century Modern became the most nostalgically powerful design period in history — constantly revived and reinterpreted. Its optimism and craft remain the benchmark against which all furniture is measured.',
  },
  {
    id: 'scandinavian-modern',
    name: 'Scandinavian Modern',
    period: '1930–1970',
    origin: 'Denmark, Sweden, Norway, Finland',
    color: '#8B5E3C',
    accent: '#F5F5F0',
    tagline: 'Nature, light and the democratic object.',
    context: 'Nordic design grew from a particular social philosophy: that well-designed objects should be available to everyone. Scandinavian welfare states invested in public design education, and designers like Wegner, Jacobsen and Aalto developed a distinctive language — organic, craft-driven, rooted in natural materials — that became globally beloved.',
    principles: ['Democratic design for everyone', 'Natural materials — especially wood', 'Craft as the foundation of design', 'Functionality and beauty as one', 'Restraint and clarity'],
    visual: ['Warm wood tones — beech, teak, oak', 'Soft organic silhouettes', 'Muted natural palettes', 'Visible craftsmanship', 'Textural contrast'],
    designers: ['Alvar Aalto', 'Hans Wegner', 'Arne Jacobsen', 'Verner Panton', 'Poul Kjærholm'],
    objects: ['Wishbone Chair', 'Egg Chair', 'Series 7 Chair', 'Stool 60 by Aalto'],
    legacy: 'Scandinavian design is arguably the most widely exported design aesthetic in history — its influence visible in everything from IKEA to contemporary cafe culture worldwide.',
  },
  {
    id: 'italian-radical-design',
    name: 'Italian Radical Design',
    period: '1960–1985',
    origin: 'Italy',
    color: '#C0C0C0',
    accent: '#0A0A0A',
    tagline: 'When Italy invented the future of the domestic object.',
    context: 'Post-war Italy experienced an economic miracle and a design explosion. Milan became the capital of global furniture design, with manufacturers like Cassina, Arflex, and Flos commissioning the most avant-garde designers in the world. From the irony of Castiglioni to the sensuality of Pesce, Italian design was never just functional — it was philosophical.',
    principles: ['Design as cultural commentary', 'Irony and wit as aesthetic tools', 'Provocation and surprise', 'Sensuality and material pleasure', 'The object as narrative'],
    visual: ['Bold unexpected forms', 'Industrial materials made beautiful', 'Pop culture references', 'Scale manipulation', 'Humor and surprise'],
    designers: ['Achille Castiglioni', 'Ettore Sottsass', 'Joe Colombo', 'Gaetano Pesce', 'Vico Magistretti'],
    objects: ['Arco Lamp', 'Togo Sofa', 'LC2 Sofa', 'Componibili', 'Valentine Typewriter'],
    legacy: 'Italian Radical Design gave the world the idea that furniture could be culturally provocative. Memphis Milano — its most extreme expression — directly influenced fashion, graphic design and contemporary art.',
  },
  {
    id: 'memphis-milano',
    name: 'Memphis Milano',
    period: '1981–1988',
    origin: 'Italy',
    color: '#FF0022',
    accent: '#F5F5F0',
    tagline: 'An explosion of color, pattern and deliberate bad taste.',
    context: 'Founded by Ettore Sottsass in Milan on December 11, 1980, Memphis was a direct assault on the "good taste" of Modernism. The group\'s first collection in 1981 — filled with plastic laminates, clashing colors and irrational forms — was a cultural shock. Karl Lagerfeld bought the entire collection. Memphis made design dangerous again.',
    principles: ['Anti-Minimalism', 'Color as emotion', 'Pattern and surface as language', 'Deliberate irony and kitsch', 'No hierarchy between high and low culture'],
    visual: ['Bold graphic surface patterns', 'Primary and secondary color combinations', 'Postmodern geometric forms', 'Plastic laminates and terrazzo', 'Asymmetry and imbalance'],
    designers: ['Ettore Sottsass', 'Michael Graves', 'Andrea Branzi', 'Michele De Lucchi', 'George Sowden'],
    objects: ['Carlton Bookcase', 'Bel Air Chair', 'Tahiti Lamp', 'Beverly Cabinet'],
    legacy: 'Memphis directly influenced 1980s fashion, music videos, graphic design and everything that came after. Its DNA is visible in contemporary design by Virgil Abloh, Nathalie Du Pasquier and an entire generation of post-Postmodern designers.',
  },
  {
    id: 'minimalism',
    name: 'Minimalism',
    period: '1960–present',
    origin: 'USA / Japan',
    color: '#0A0A0A',
    accent: '#F5F5F0',
    tagline: 'The most demanding aesthetic: everything must earn its place.',
    context: 'Minimalism in design grew from a belief that reduction was a spiritual and intellectual act. Dieter Rams codified it in his Ten Principles; Donald Judd embodied it in sculpture; Japanese Ma (negative space) philosophy infused it with depth. In the 21st century, Apple — and Jonathan Ive — carried it into billions of pockets.',
    principles: ['Reduction to the essential', 'Every element must earn its presence', 'Material and surface honesty', 'Silence as a design tool', 'Clarity over complexity'],
    visual: ['White, grey and black palettes', 'Clean geometric forms', 'Flush surfaces and hidden joinery', 'Absence as presence', 'Single material focus'],
    designers: ['Dieter Rams', 'Naoto Fukasawa', 'Jasper Morrison', 'John Pawson', 'Shiro Kuramata'],
    objects: ['Braun SK4', 'Apple iPhone (industrial design)', '606 Shelving System', 'Super Normal objects'],
    legacy: 'Minimalism has become the dominant design language of the 21st century — from tech products to luxury fashion to domestic architecture.',
  },
  {
    id: 'contemporary-design',
    name: 'Contemporary Design',
    period: '1990–present',
    origin: 'International',
    color: '#0A0A0A',
    accent: '#FF4D00',
    tagline: 'Post-everything. The world of design after certainty.',
    context: 'Contemporary design has no single manifesto. After Postmodernism questioned Modernism, after Memphis questioned good taste, after globalization dissolved national design traditions — designers like Patricia Urquiola, Konstantin Grcic and Marc Newson work in a world of infinite references and complete creative freedom.',
    principles: ['Pluralism over doctrine', 'Sustainability as responsibility', 'Technology as material', 'Cultural hybridity', 'Experimental processes'],
    visual: ['Hybrid material combinations', 'Biomorphic digital forms', 'Sustainable and recycled materials', 'Global cultural references', 'Process as aesthetic'],
    designers: ['Patricia Urquiola', 'Konstantin Grcic', 'Marc Newson', 'Ronan & Erwan Bouroullec', 'Hella Jongerius'],
    objects: ['Togo Sofa reissues', 'Magis Spun Chair', 'Bouroullec Vegetal Chair'],
    legacy: 'Contemporary design continues to evolve — incorporating sustainability, digital fabrication and global cultural exchange into a design practice without historical parallel.',
  },
];

export interface TimelineEvent {
  year: number;
  event: string;
  category: 'movement' | 'object' | 'designer' | 'moment';
  color: string;
  description: string;
}

export const timelineEvents: TimelineEvent[] = [
  { year: 1860, event: 'Arts & Crafts Movement', category: 'movement', color: '#7B5E4A', description: 'William Morris and John Ruskin launch a revolt against industrial mass production.' },
  { year: 1890, event: 'Art Nouveau', category: 'movement', color: '#4A7A4A', description: 'Nature as form language — organic curves enter furniture and architecture.' },
  { year: 1919, event: 'Bauhaus Founded', category: 'movement', color: '#E8FF00', description: 'Walter Gropius opens the most influential design school in history in Weimar.' },
  { year: 1925, event: 'Wassily Chair', category: 'object', color: '#4A4A4A', description: 'Marcel Breuer bends steel tubing for the first time. Furniture changes forever.' },
  { year: 1929, event: 'Barcelona Chair', category: 'object', color: '#0028FF', description: 'Mies van der Rohe designs a throne for the modern age.' },
  { year: 1933, event: 'Bauhaus Closes', category: 'moment', color: '#FF0022', description: 'Nazi pressure forces the school to dissolve. Its faculty disperses worldwide — and takes everything with them.' },
  { year: 1944, event: 'Noguchi Coffee Table', category: 'object', color: '#2C3E50', description: 'Sculpture and furniture become one object.' },
  { year: 1945, event: 'Post-War Modern', category: 'moment', color: '#FF4D00', description: 'A new world needs new objects. Mid-Century Modern begins.' },
  { year: 1952, event: 'Diamond Chair', category: 'object', color: '#B0B0B0', description: 'Harry Bertoia turns wire into sculpture — and calls it a chair.' },
  { year: 1955, event: 'Wishbone Chair', category: 'object', color: '#8B5E3C', description: 'Hans Wegner perfects Danish craft. 100 meters of paper cord, woven by hand.' },
  { year: 1956, event: 'Eames Lounge Chair', category: 'object', color: '#FF4D00', description: 'Charles and Ray Eames debut the most beloved chair in history on national television.' },
  { year: 1958, event: 'Egg Chair', category: 'object', color: '#E8FF00', description: 'Arne Jacobsen sculpts a room within a room in his garage.' },
  { year: 1960, event: 'Panton Chair Prototype', category: 'object', color: '#FF0022', description: 'Verner Panton imagines the first single-piece plastic chair. Nobody believes it can be made.' },
  { year: 1962, event: 'Arco Lamp', category: 'object', color: '#C0C0C0', description: 'The Castiglioni brothers solve a lighting problem with 65 kilograms of marble.' },
  { year: 1967, event: 'Panton Chair in Production', category: 'object', color: '#FF0022', description: 'After 8 years and every manufacturer saying no, Vitra finally makes Panton\'s dream real.' },
  { year: 1973, event: 'Togo Sofa', category: 'object', color: '#8B2FC9', description: 'Michel Ducaroy removes the frame entirely. Pure foam. Pure comfort.' },
  { year: 1981, event: 'Memphis Milano', category: 'movement', color: '#FF0022', description: 'Ettore Sottsass declares war on good taste. Plastic laminates and primary colors explode.' },
  { year: 1995, event: 'Dieter Rams Retires', category: 'moment', color: '#0A0A0A', description: 'The man who invented "less, but better" quietly steps down from Braun.' },
  { year: 2007, event: 'iPhone', category: 'moment', color: '#1A1A1A', description: 'Industrial design enters the pocket. Dieter Rams\'s legacy reaches 1 billion people.' },
  { year: 2024, event: 'Now', category: 'moment', color: '#FF4D00', description: 'Design has never been more discussed, more contested, or more necessary.' },
];

export const getMovementById = (id: string) => movements.find(m => m.id === id);
