import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { materials, getMaterialById } from '../data/materials';
import { BackBtn, Marquee, SectionLabel, Tag } from '../components/UI';

// ── INDEX ─────────────────────────────────────────────────
export function MaterialsIndex() {
  const navigate = useNavigate();
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <section style={{ padding: '18vh 6vw 8vh', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-4vw', bottom: '-8vw', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(80px, 22vw, 320px)', lineHeight: 1, color: 'transparent', WebkitTextStroke: '1px rgba(245,245,240,0.04)', pointerEvents: 'none', letterSpacing: '-0.06em' }}>
          MATTER
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <SectionLabel text={`MATERIALS — ${materials.length} ENTRIES`} />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(40px, 9vw, 120px)', lineHeight: 0.88, letterSpacing: '-0.05em', color: '#F5F5F0' }}>
            THE<br /><span style={{ color: '#C0C0C0' }}>MATTER</span>
          </div>
        </motion.div>
      </section>

      <div style={{ padding: '0 6vw 14vh', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2px' }}>
        {materials.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.6 }}
            onClick={() => navigate(`/materials/${m.id}`)}
            whileHover={{ scale: 1.02 }}
            style={{ background: m.color, padding: '40px 32px', cursor: 'none', position: 'relative', overflow: 'hidden', minHeight: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
          >
            <div style={{ position: 'absolute', top: '-10px', right: '-8px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '100px', lineHeight: 1, color: 'transparent', WebkitTextStroke: `1px ${m.accent}12`, letterSpacing: '-0.06em', pointerEvents: 'none' }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: `${m.accent}60`, marginBottom: '10px' }}>{m.era}</div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(20px, 3vw, 34px)', letterSpacing: '-0.03em', color: m.accent, lineHeight: 1.05, marginBottom: '10px' }}>{m.name}</div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px', lineHeight: 1.5, color: `${m.accent}65`, fontWeight: 300 }}>{m.tagline}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── DETAIL ─────────────────────────────────────────────────
export function MaterialPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const material = getMaterialById(id || '');

  if (!material) return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#FF4D00', fontFamily: 'Space Mono, monospace' }}>MATERIAL NOT FOUND</div>
    </div>
  );

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ minHeight: '90vh', background: material.color, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12vh 6vw 8vh' }}>
        <div style={{ position: 'absolute', top: '-6vw', right: '-3vw', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(100px, 28vw, 440px)', lineHeight: 1, color: 'transparent', WebkitTextStroke: `1px ${material.accent}08`, pointerEvents: 'none', letterSpacing: '-0.06em' }}>
          MAT
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ position: 'absolute', top: '100px', left: '6vw', zIndex: 10 }}>
          <BackBtn label="← MATERIALS" to="/materials" />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ marginBottom: '24px' }}>
          <Tag bg={`${material.accent}15`} fg={material.accent}>{material.era}</Tag>
        </motion.div>

        <div style={{ overflow: 'hidden' }}>
          {material.name.split(' ').map((w, i) => (
            <motion.div
              key={i}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.55 + i * 0.09, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              style={{ display: 'block', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(40px, 9vw, 120px)', lineHeight: 0.88, letterSpacing: '-0.05em', color: material.accent }}
            >
              {w}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} style={{ marginTop: '36px', maxWidth: '55%' }}>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 300, fontSize: 'clamp(15px, 2vw, 22px)', lineHeight: 1.5, color: `${material.accent}75` }}>
            {material.tagline}
          </div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <Marquee text={`${material.name} — ${material.era} — ${material.tagline}`} bg="#0A0A0A" fg={material.color} />

      {/* HISTORY + MANUFACTURING */}
      <section style={{ background: '#0A0A0A', padding: '14vh 6vw', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8vw' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <SectionLabel text="HISTORY" />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(15px, 1.8vw, 20px)', lineHeight: 1.7, color: 'rgba(245,245,240,0.8)', fontWeight: 300 }}>
            {material.history}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.12 }}>
          <SectionLabel text="HOW IT'S MADE" />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(15px, 1.8vw, 20px)', lineHeight: 1.7, color: 'rgba(245,245,240,0.8)', fontWeight: 300 }}>
            {material.manufacturing}
          </div>
        </motion.div>
      </section>

      {/* ADVANTAGES */}
      <section style={{ background: material.color, padding: '12vh 6vw' }}>
        <SectionLabel text="ADVANTAGES" color={`${material.accent}50`} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {material.advantages.map((adv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              style={{ borderTop: `2px solid ${material.accent}30`, paddingTop: '20px' }}
            >
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: `${material.accent}50`, marginBottom: '8px' }}>{String(i + 1).padStart(2, '0')}</div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(14px, 1.8vw, 20px)', color: material.accent, lineHeight: 1.4 }}>{adv}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAMOUS OBJECTS + DESIGNERS */}
      <section style={{ background: '#111', padding: '14vh 6vw', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6vw' }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <SectionLabel text="MOST FAMOUS OBJECTS" />
          {material.famousObjects.map((obj, i) => (
            <div key={i} style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 'clamp(14px, 1.8vw, 20px)', color: material.color, padding: '12px 0', borderBottom: '1px solid rgba(245,245,240,0.06)' }}>
              {obj}
            </div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
          <SectionLabel text="MOST FAMOUS DESIGNERS" />
          {material.famousDesigners.map((des, i) => (
            <div key={i} style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 'clamp(14px, 1.8vw, 20px)', color: 'rgba(245,245,240,0.7)', padding: '12px 0', borderBottom: '1px solid rgba(245,245,240,0.06)' }}>
              {des}
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
