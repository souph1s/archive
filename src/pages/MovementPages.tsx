import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { movements, getMovementById } from '../data/movements';
import { artifacts } from '../data/artifacts';
import { BackBtn, Marquee, SectionLabel, RelatedCard } from '../components/UI';

// ── INDEX ─────────────────────────────────────────────────
export function MovementsIndex() {
  const navigate = useNavigate();
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <section style={{ padding: '18vh 6vw 8vh', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-4vw', bottom: '-8vw', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(80px, 20vw, 300px)', lineHeight: 1, color: 'transparent', WebkitTextStroke: '1px rgba(245,245,240,0.04)', pointerEvents: 'none', letterSpacing: '-0.06em' }}>
          ERAS
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <SectionLabel text={`MOVEMENTS — ${movements.length} ERAS`} />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(40px, 9vw, 120px)', lineHeight: 0.88, letterSpacing: '-0.05em', color: '#F5F5F0' }}>
            DESIGN<br /><span style={{ color: '#E8FF00' }}>HISTORY</span>
          </div>
        </motion.div>
      </section>

      <div style={{ padding: '0 6vw 14vh', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2px' }}>
        {movements.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.6 }}
            onClick={() => navigate(`/movements/${m.id}`)}
            whileHover={{ scale: 1.02 }}
            style={{ background: m.color, padding: '40px 32px', cursor: 'none', position: 'relative', overflow: 'hidden', minHeight: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
          >
            <div style={{ position: 'absolute', top: '-20px', right: '-10px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '110px', lineHeight: 1, color: 'transparent', WebkitTextStroke: `1px ${m.accent}15`, letterSpacing: '-0.06em', pointerEvents: 'none' }}>
              {m.period.split('–')[0].split('—')[0].trim()}
            </div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: `${m.accent}80`, marginBottom: '12px' }}>
              {m.period} — {m.origin}
            </div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(20px, 3vw, 32px)', letterSpacing: '-0.03em', color: m.accent, lineHeight: 1.05, marginBottom: '12px' }}>
              {m.name}
            </div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px', lineHeight: 1.5, color: `${m.accent}70`, fontWeight: 300 }}>
              {m.tagline}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── DETAIL ─────────────────────────────────────────────────
export function MovementPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movement = getMovementById(id || '');

  if (!movement) return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#FF4D00', fontFamily: 'Space Mono, monospace' }}>MOVEMENT NOT FOUND</div>
    </div>
  );

  const relatedArtifacts = artifacts.filter(a => a.movementId === movement.id);

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ minHeight: '100vh', background: movement.color, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12vh 6vw 8vh' }}>
        <div style={{ position: 'absolute', top: '-8vw', right: '-4vw', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(100px, 24vw, 360px)', lineHeight: 1, color: 'transparent', WebkitTextStroke: `1px ${movement.accent}10`, pointerEvents: 'none', letterSpacing: '-0.06em' }}>
          {movement.period}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ position: 'absolute', top: '100px', left: '6vw', zIndex: 10 }}>
          <BackBtn label="← MOVEMENTS" to="/movements" />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ position: 'relative', zIndex: 2, marginBottom: '24px' }}>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.25em', color: `${movement.accent}60` }}>
            {movement.period} — {movement.origin}
          </div>
        </motion.div>

        <div style={{ position: 'relative', zIndex: 2, overflow: 'hidden' }}>
          {movement.name.split(' ').map((w, i) => (
            <motion.div
              key={i}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.55 + i * 0.1, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              style={{ display: 'block', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(40px, 9vw, 120px)', lineHeight: 0.88, letterSpacing: '-0.05em', color: movement.accent }}
            >
              {w}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
          style={{ position: 'relative', zIndex: 2, marginTop: '40px', maxWidth: '60%' }}
        >
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 300, fontSize: 'clamp(15px, 2vw, 22px)', lineHeight: 1.5, color: `${movement.accent}80` }}>
            {movement.tagline}
          </div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <Marquee text={`${movement.name} — ${movement.period} — ${movement.origin}`} bg="#0A0A0A" fg={movement.color} />

      {/* CONTEXT */}
      <section style={{ background: '#0A0A0A', padding: '14vh 6vw' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <SectionLabel text="HISTORICAL CONTEXT" />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(16px, 2.2vw, 26px)', lineHeight: 1.6, color: 'rgba(245,245,240,0.8)', fontWeight: 300, maxWidth: '75%' }}>
            {movement.context}
          </div>
        </motion.div>
      </section>

      {/* PRINCIPLES + VISUAL */}
      <section style={{ background: '#111', padding: '14vh 6vw', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6vw' }}>
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <SectionLabel text="CORE PRINCIPLES" />
          {movement.principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '14px 0', borderBottom: '1px solid rgba(245,245,240,0.06)' }}
            >
              <div style={{ width: '6px', height: '6px', background: movement.color, borderRadius: '50%', marginTop: '8px', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(14px, 1.6vw, 18px)', color: 'rgba(245,245,240,0.8)', lineHeight: 1.4 }}>{p}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
          <SectionLabel text="VISUAL CHARACTERISTICS" />
          {movement.visual.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '14px 0', borderBottom: '1px solid rgba(245,245,240,0.06)' }}
            >
              <div style={{ width: '6px', height: '6px', border: `1px solid ${movement.color}`, borderRadius: '50%', marginTop: '8px', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(14px, 1.6vw, 18px)', color: 'rgba(245,245,240,0.75)', lineHeight: 1.4 }}>{v}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* KEY DESIGNERS */}
      <section style={{ background: movement.color, padding: '14vh 6vw' }}>
        <SectionLabel text="KEY DESIGNERS" color={`${movement.accent}50`} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {movement.designers.map((name, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(14px, 2vw, 24px)', color: movement.accent, padding: '8px 0', borderBottom: `1px solid ${movement.accent}25`, cursor: 'none' }}
            >
              {name}
            </motion.div>
          ))}
        </div>
      </section>

      {/* LEGACY */}
      <section style={{ background: '#0A0A0A', padding: '14vh 6vw' }}>
        <SectionLabel text="LEGACY" />
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(22px, 4vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#F5F5F0', maxWidth: '80%' }}>
          {movement.legacy}
        </div>
      </section>

      {/* RELATED ARTIFACTS */}
      {relatedArtifacts.length > 0 && (
        <section style={{ background: '#111', padding: '10vh 6vw', borderTop: '1px solid rgba(245,245,240,0.06)' }}>
          <SectionLabel text="OBJECTS FROM THIS ERA" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {relatedArtifacts.map(r => (
              <RelatedCard
                key={r.id}
                name={r.name}
                sub={`${r.designer} — ${r.year}`}
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
