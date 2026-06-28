import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { designers, getDesignerById } from '../data/designers';
import { artifacts } from '../data/artifacts';
import { BackBtn, Marquee, SectionLabel, Tag, RelatedCard } from '../components/UI';

// ── INDEX ─────────────────────────────────────────────────
export function DesignersIndex() {
  const navigate = useNavigate();
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
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            onClick={() => navigate(`/designers/${d.id}`)}
            whileHover={{ x: 14 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(245,245,240,0.07)', padding: '30px 0', cursor: 'none' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ width: '10px', height: '10px', background: d.color, borderRadius: '50%', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: 'rgba(245,245,240,0.25)', minWidth: '28px' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 3vw, 44px)', letterSpacing: '-0.03em', color: '#F5F5F0', lineHeight: 1 }}>
                  {d.name}
                </div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(245,245,240,0.35)', marginTop: '6px' }}>
                  {d.nationality} — {d.years}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.12em', background: d.color, color: d.accent, padding: '4px 10px' }}>
                {d.movements[0]?.toUpperCase().substring(0, 16)}
              </span>
              <span style={{ color: '#FF4D00', fontSize: '18px' }}>→</span>
            </div>
          </motion.div>
        ))}
        <div style={{ borderTop: '1px solid rgba(245,245,240,0.07)' }} />
      </div>
    </div>
  );
}

// ── DETAIL ─────────────────────────────────────────────────
export function DesignerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const designer = getDesignerById(id || '');

  if (!designer) return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#FF4D00', fontFamily: 'Space Mono, monospace' }}>DESIGNER NOT FOUND</div>
    </div>
  );

  const works = designer.artifactIds.map(aid => artifacts.find(a => a.id === aid)).filter(Boolean);

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12vh 6vw 8vh' }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: 'absolute', top: '15%', right: 0, width: '38vw', height: '60vh', background: designer.color, transformOrigin: 'right', zIndex: 1 }}
        />
        <div style={{ position: 'absolute', bottom: '-4vw', left: '-2vw', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(80px, 20vw, 300px)', lineHeight: 1, letterSpacing: '-0.06em', color: 'transparent', WebkitTextStroke: '1px rgba(245,245,240,0.05)', pointerEvents: 'none' }}>
          {designer.years.split('—')[0].trim()}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ position: 'absolute', top: '100px', left: '6vw', zIndex: 10 }}>
          <BackBtn label="← DESIGNERS" to="/designers" />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ position: 'relative', zIndex: 2, marginBottom: '28px' }}>
          <Tag bg={designer.color} fg={designer.accent}>{designer.nationality.toUpperCase()}</Tag>
        </motion.div>

        <div style={{ position: 'relative', zIndex: 2, overflow: 'hidden' }}>
          {designer.name.split(' ').map((w, i) => (
            <motion.div
              key={i}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.65 + i * 0.07, duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
              style={{ display: 'block', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 7.5vw, 110px)', lineHeight: 0.88, letterSpacing: '-0.05em', color: '#F5F5F0' }}
            >
              {w}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          style={{ position: 'relative', zIndex: 2, marginTop: '36px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}
        >
          {[
            { label: 'LIFESPAN', value: designer.years },
            { label: 'NATIONALITY', value: designer.nationality },
            { label: 'PRIMARY MOVEMENT', value: designer.movements[0] },
          ].map(m => (
            <div key={m.label}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(245,245,240,0.35)', marginBottom: '6px' }}>{m.label}</div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '14px', color: '#F5F5F0' }}>{m.value}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* MARQUEE */}
      <Marquee text={`${designer.name} — ${designer.tagline}`} bg={designer.color} fg={designer.accent} />

      {/* BIOGRAPHY + PHILOSOPHY */}
      <section style={{ background: '#0A0A0A', padding: '14vh 6vw', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8vw' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <SectionLabel text="BIOGRAPHY" />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(15px, 1.8vw, 20px)', lineHeight: 1.7, color: 'rgba(245,245,240,0.8)', fontWeight: 300 }}>
            {designer.biography}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.12 }}>
          <SectionLabel text="DESIGN PHILOSOPHY" />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(15px, 1.8vw, 20px)', lineHeight: 1.7, color: 'rgba(245,245,240,0.8)', fontWeight: 300 }}>
            {designer.philosophy}
          </div>
        </motion.div>
      </section>

      {/* QUOTE */}
      <section style={{ background: designer.color, padding: '14vh 6vw', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-3vw', bottom: '-6vw', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(80px, 18vw, 260px)', lineHeight: 1, color: 'transparent', WebkitTextStroke: `1px ${designer.accent}18`, pointerEvents: 'none', letterSpacing: '-0.05em' }}>
          QUOTE
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
          style={{ maxWidth: '80%', position: 'relative', zIndex: 1 }}
        >
          <SectionLabel text="IN THEIR OWN WORDS" color={`${designer.accent}50`} />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(22px, 4.5vw, 60px)', lineHeight: 1.05, letterSpacing: '-0.03em', color: designer.accent }}>
            "{designer.quote}"
          </div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', color: `${designer.accent}60`, marginTop: '24px' }}>
            — {designer.name.toUpperCase()}
          </div>
        </motion.div>
      </section>

      {/* TIMELINE */}
      <section style={{ background: '#111', padding: '14vh 6vw' }}>
        <SectionLabel text="CAREER TIMELINE" />
        <div style={{ position: 'relative', paddingLeft: '40px' }}>
          <div style={{ position: 'absolute', left: '6px', top: 0, bottom: 0, width: '1px', background: 'rgba(245,245,240,0.08)' }} />
          {designer.timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              style={{ position: 'relative', marginBottom: '32px' }}
            >
              <div style={{ position: 'absolute', left: '-34px', top: '6px', width: '10px', height: '10px', background: designer.color, borderRadius: '50%' }} />
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', color: designer.color, marginBottom: '6px' }}>
                {item.year}
              </div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(14px, 1.6vw, 18px)', color: 'rgba(245,245,240,0.8)', lineHeight: 1.4 }}>
                {item.event}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAMOUS WORKS text list */}
      <section style={{ background: '#0A0A0A', padding: '14vh 6vw', borderTop: '1px solid rgba(245,245,240,0.06)' }}>
        <SectionLabel text="MOST FAMOUS WORKS" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {designer.famousWorks.map((w, i) => (
            <motion.div
              key={w}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.6 }}
              style={{ display: 'flex', alignItems: 'center', gap: '20px', borderTop: '1px solid rgba(245,245,240,0.06)', padding: '20px 0' }}
            >
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: 'rgba(245,245,240,0.2)', minWidth: '24px' }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 'clamp(16px, 2.5vw, 32px)', letterSpacing: '-0.02em', color: '#F5F5F0' }}>{w}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INFLUENCE NETWORK */}
      <section style={{ background: '#111', padding: '14vh 6vw', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6vw' }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <SectionLabel text="INFLUENCED BY" />
          {designer.influencedBy.map((name, i) => (
            <div key={i} style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 'clamp(14px, 2vw, 22px)', color: 'rgba(245,245,240,0.6)', padding: '10px 0', borderBottom: '1px solid rgba(245,245,240,0.06)' }}>
              {name}
            </div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.12 }}>
          <SectionLabel text="INFLUENCED" />
          {designer.influenced.map((name, i) => (
            <div key={i} style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 'clamp(14px, 2vw, 22px)', color: designer.color, padding: '10px 0', borderBottom: '1px solid rgba(245,245,240,0.06)' }}>
              {name}
            </div>
          ))}
        </motion.div>
      </section>

      {/* FACTS */}
      <section style={{ background: '#0A0A0A', padding: '14vh 6vw' }}>
        <SectionLabel text="FACTS" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
          {designer.facts.map((fact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              style={{ borderLeft: `2px solid ${designer.color}`, paddingLeft: '18px' }}
            >
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(13px, 1.5vw, 17px)', lineHeight: 1.65, color: 'rgba(245,245,240,0.7)', fontWeight: 300 }}>
                {fact}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* RELATED OBJECTS */}
      {works.length > 0 && (
        <section style={{ background: '#111', padding: '10vh 6vw', borderTop: '1px solid rgba(245,245,240,0.06)' }}>
          <SectionLabel text="IN THE ARCHIVE" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {works.map(r => r && (
              <RelatedCard
                key={r.id}
                name={r.name}
                sub={String(r.year)}
                color={r.color}
                onClick={() => navigate(`/objects/${r.id}`)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
