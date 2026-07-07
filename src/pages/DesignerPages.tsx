import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { designers, getDesignerById } from '../data/designers';
import { artifacts } from '../data/artifacts';
import { BackBtn, Marquee, SectionLabel, Tag, RelatedCard } from '../components/UI';
import MuseumImage, { MuseumGallery } from '../components/MuseumImage';
import { useDesignerImage, useDesignerGallery } from '../hooks/useImage';
import { imageService } from '../services/imageService';

// ── INDEX ─────────────────────────────────────────────────
export function DesignersIndex() {
  const navigate = useNavigate();
  React.useEffect(() => {
    imageService.prefetch('designer', designers.map(d => d.id));
  }, []);

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <section style={{ padding: '18vh 6vw 8vh', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-4vw', bottom: '-8vw', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(80px, 22vw, 320px)', lineHeight: 1, color: 'transparent', WebkitTextStroke: '1px rgba(245,245,240,0.04)', pointerEvents: 'none', letterSpacing: '-0.06em' }}>
          MASTERS
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <SectionLabel text={`THE MASTERS — ${designers.length} DESIGNERS`} />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(40px, 9vw, 120px)', lineHeight: 0.88, letterSpacing: '-0.05em', color: '#F5F5F0' }}>
            THE<br /><span style={{ color: '#0028FF' }}>MASTERS</span>
          </div>
        </motion.div>
      </section>

      <div style={{ padding: '0 6vw 14vh' }}>
        {designers.map((d, i) => (
          <DesignerRow key={d.id} designer={d} index={i} onClick={() => navigate(`/designers/${d.id}`)} />
        ))}
        <div style={{ borderTop: '1px solid rgba(245,245,240,0.07)' }} />
      </div>
    </div>
  );
}

function DesignerRow({ designer, index, onClick }: { designer: typeof designers[0]; index: number; onClick: () => void }) {
  const img = useDesignerImage(designer.id);
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ x: 12 }}
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(245,245,240,0.07)', padding: '24px 0', cursor: 'none', position: 'relative' }}
    >
      {/* Thumbnail peek on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.92 }}
        transition={{ duration: 0.25 }}
        style={{ position: 'absolute', left: '340px', top: '-10px', width: '80px', height: '100px', zIndex: 10, pointerEvents: 'none', overflow: 'hidden' }}
      >
        <MuseumImage image={img} aspect="4/5" fit="cover" accentColor={designer.color} style={{ width: '100%', height: '100%' }} />
      </motion.div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ width: '10px', height: '10px', background: designer.color, borderRadius: '50%', flexShrink: 0 }} />
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: 'rgba(245,245,240,0.25)', minWidth: '28px' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 3vw, 44px)', letterSpacing: '-0.03em', color: '#F5F5F0', lineHeight: 1 }}>
            {designer.name}
          </div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(245,245,240,0.35)', marginTop: '5px' }}>
            {designer.nationality} — {designer.years}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.12em', background: designer.color, color: designer.accent, padding: '4px 10px' }}>
          {(designer.movements[0] || '').toUpperCase().substring(0, 18)}
        </span>
        <span style={{ color: '#FF4D00', fontSize: '18px' }}>→</span>
      </div>
    </motion.div>
  );
}

// ── DETAIL ─────────────────────────────────────────────────
export function DesignerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const designer = getDesignerById(id || '');
  const heroImage = useDesignerImage(id || '');
  const gallery = useDesignerGallery(id || '');

  if (!designer) return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#FF4D00', fontFamily: 'Space Mono, monospace' }}>DESIGNER NOT FOUND</div>
    </div>
  );

  const works = designer.artifactIds.map(aid => artifacts.find(a => a.id === aid)).filter(Boolean);

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>

      {/* HERO — split layout */}
      <section style={{ minHeight: '100vh', position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* Left text */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12vh 5vw 8vh 6vw', position: 'relative', zIndex: 2 }}>
          <div style={{ position: 'absolute', bottom: '-5vw', left: '-2vw', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(80px, 20vw, 300px)', lineHeight: 1, letterSpacing: '-0.06em', color: 'transparent', WebkitTextStroke: '1px rgba(245,245,240,0.05)', pointerEvents: 'none' }}>
            {designer.years.split(/[—–]/)[0].trim()}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <BackBtn label="← DESIGNERS" to="/designers" />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ marginBottom: '24px', marginTop: '40px' }}>
            <Tag bg={designer.color} fg={designer.accent}>{designer.nationality.toUpperCase()}</Tag>
          </motion.div>

          <div style={{ overflow: 'hidden' }}>
            {designer.name.split(' ').map((w, i) => (
              <motion.div key={i}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.55 + i * 0.07, duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
                style={{ display: 'block', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 5vw, 80px)', lineHeight: 0.88, letterSpacing: '-0.05em', color: '#F5F5F0' }}>
                {w}
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'LIFESPAN', value: designer.years },
              { label: 'NATIONALITY', value: designer.nationality },
              { label: 'MOVEMENT', value: designer.movements[0] },
            ].map(m => (
              <div key={m.label} style={{ display: 'flex', gap: '16px', alignItems: 'baseline' }}>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(245,245,240,0.3)', minWidth: '100px' }}>{m.label}</div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 'clamp(12px, 1.2vw, 15px)', color: '#F5F5F0' }}>{m.value}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: portrait */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 1, ease: [0.76, 0, 0.24, 1] }} style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: designer.color, opacity: 0.1 }} />
          <MuseumImage
            image={heroImage}
            aspect="3/4"
            fit="cover"
            position="center top"
            showCredit
            accentColor={designer.color}
            style={{ height: '100%', width: '100%' }}
          />
        </motion.div>
      </section>

      {/* MARQUEE */}
      <Marquee text={`${designer.name} — ${designer.tagline}`} bg={designer.color} fg={designer.accent} />

      {/* BIO + PHILOSOPHY */}
      <section style={{ background: '#0A0A0A', padding: '14vh 6vw', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8vw' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <SectionLabel text="BIOGRAPHY" />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(15px, 1.7vw, 20px)', lineHeight: 1.7, color: 'rgba(245,245,240,0.8)', fontWeight: 300 }}>
            {designer.biography}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.12 }}>
          <SectionLabel text="DESIGN PHILOSOPHY" />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(15px, 1.7vw, 20px)', lineHeight: 1.7, color: 'rgba(245,245,240,0.8)', fontWeight: 300 }}>
            {designer.philosophy}
          </div>
        </motion.div>
      </section>

      {/* GALLERY */}
      <section style={{ background: '#111', padding: '12vh 6vw' }}>
        <SectionLabel text="GALLERY" />
        <MuseumGallery gallery={gallery} accentColor={designer.color} />
      </section>

      {/* QUOTE */}
      <section style={{ background: designer.color, padding: '14vh 6vw', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-3vw', bottom: '-6vw', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(80px, 18vw, 260px)', lineHeight: 1, color: 'transparent', WebkitTextStroke: `1px ${designer.accent}14`, pointerEvents: 'none', letterSpacing: '-0.05em' }}>QUOTE</div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ maxWidth: '80%', position: 'relative', zIndex: 1 }}>
          <SectionLabel text="IN THEIR OWN WORDS" color={`${designer.accent}45`} />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(20px, 4vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.03em', color: designer.accent }}>
            "{designer.quote}"
          </div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', color: `${designer.accent}55`, marginTop: '22px' }}>
            — {designer.name.toUpperCase()}
          </div>
        </motion.div>
      </section>

      {/* TIMELINE */}
      <section style={{ background: '#111', padding: '14vh 6vw' }}>
        <SectionLabel text="CAREER TIMELINE" />
        <div style={{ position: 'relative', paddingLeft: '40px' }}>
          <div style={{ position: 'absolute', left: '6px', top: 0, bottom: 0, width: '1px', background: 'rgba(245,245,240,0.07)' }} />
          {designer.timeline.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.6 }}
              style={{ position: 'relative', marginBottom: '30px' }}>
              <div style={{ position: 'absolute', left: '-34px', top: '6px', width: '10px', height: '10px', background: designer.color, borderRadius: '50%' }} />
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', color: designer.color, marginBottom: '5px' }}>{item.year}</div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(13px, 1.5vw, 17px)', color: 'rgba(245,245,240,0.8)', lineHeight: 1.4 }}>{item.event}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAMOUS WORKS */}
      <section style={{ background: '#0A0A0A', padding: '14vh 6vw', borderTop: '1px solid rgba(245,245,240,0.06)' }}>
        <SectionLabel text="MOST FAMOUS WORKS" />
        {designer.famousWorks.map((w, i) => (
          <motion.div key={w} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', gap: '20px', borderTop: '1px solid rgba(245,245,240,0.06)', padding: '18px 0' }}>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: 'rgba(245,245,240,0.2)', minWidth: '24px' }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 'clamp(14px, 2.2vw, 28px)', letterSpacing: '-0.02em', color: '#F5F5F0' }}>{w}</span>
          </motion.div>
        ))}
      </section>

      {/* INFLUENCE NETWORK */}
      <section style={{ background: '#111', padding: '14vh 6vw', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6vw' }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <SectionLabel text="INFLUENCED BY" />
          {designer.influencedBy.map((name, i) => (
            <div key={i} style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 'clamp(14px, 1.8vw, 22px)', color: 'rgba(245,245,240,0.55)', padding: '10px 0', borderBottom: '1px solid rgba(245,245,240,0.06)' }}>{name}</div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
          <SectionLabel text="INFLUENCED" />
          {designer.influenced.map((name, i) => (
            <div key={i} style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 'clamp(14px, 1.8vw, 22px)', color: designer.color, padding: '10px 0', borderBottom: '1px solid rgba(245,245,240,0.06)' }}>{name}</div>
          ))}
        </motion.div>
      </section>

      {/* FACTS */}
      <section style={{ background: '#0A0A0A', padding: '14vh 6vw' }}>
        <SectionLabel text="FACTS" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
          {designer.facts.map((fact, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.6 }}
              style={{ borderLeft: `2px solid ${designer.color}`, paddingLeft: '18px' }}>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(13px, 1.4vw, 17px)', lineHeight: 1.65, color: 'rgba(245,245,240,0.7)', fontWeight: 300 }}>{fact}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ARCHIVE OBJECTS */}
      {works.length > 0 && (
        <section style={{ background: '#111', padding: '10vh 6vw', borderTop: '1px solid rgba(245,245,240,0.06)' }}>
          <SectionLabel text="IN THE ARCHIVE" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {works.map(r => r && (
              <RelatedCard key={r.id} name={r.name} sub={String(r.year)} color={r.color} onClick={() => navigate(`/objects/${r.id}`)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
