import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getArtifactById, artifacts } from '../data/artifacts';
import { BackBtn, Marquee, SectionLabel, Tag, RelatedCard } from '../components/UI';

export default function ArtifactPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const artifact = getArtifactById(id || '');

  if (!artifact) {
    return (
      <div style={{ background: '#0A0A0A', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#FF4D00', fontFamily: 'Space Mono, monospace' }}>OBJECT NOT FOUND</div>
      </div>
    );
  }

  const related = artifact.relatedArtifacts.map(rid => artifacts.find(a => a.id === rid)).filter(Boolean);

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12vh 6vw 8vh' }}>
        {/* Color slab */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: 'absolute', top: 0, right: 0, width: '42vw', height: '100%', background: artifact.color, transformOrigin: 'top', zIndex: 1 }}
        />

        {/* Ghost year */}
        <div style={{ position: 'absolute', bottom: '-5vw', left: '-2vw', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(120px, 28vw, 420px)', lineHeight: 1, letterSpacing: '-0.06em', color: 'transparent', WebkitTextStroke: '1px rgba(245,245,240,0.05)', pointerEvents: 'none', zIndex: 0 }}>
          {artifact.year}
        </div>

        {/* Nav back */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ position: 'absolute', top: '100px', left: '6vw', zIndex: 10 }}>
          <BackBtn label="← OBJECTS" to="/objects" />
        </motion.div>

        {/* Category tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
          style={{ position: 'relative', zIndex: 2, marginBottom: '32px' }}
        >
          <Tag bg={artifact.color} fg={artifact.accent}>{artifact.category.toUpperCase()}</Tag>
        </motion.div>

        {/* Name */}
        <div style={{ position: 'relative', zIndex: 2, overflow: 'hidden' }}>
          {artifact.name.split(' ').map((word, i) => (
            <motion.div
              key={i}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.6 + i * 0.08, duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
              style={{ display: 'block', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(40px, 9vw, 130px)', lineHeight: 0.88, letterSpacing: '-0.05em', color: '#F5F5F0' }}
            >
              {word}
            </motion.div>
          ))}
        </div>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}
          style={{ position: 'relative', zIndex: 2, marginTop: '40px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}
        >
          {[
            { label: 'DESIGNER', value: artifact.designer },
            { label: 'YEAR', value: String(artifact.year) },
            { label: 'COUNTRY', value: artifact.country },
            { label: 'MANUFACTURER', value: artifact.manufacturer },
          ].map(m => (
            <div key={m.label}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(245,245,240,0.35)', marginBottom: '6px' }}>{m.label}</div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '14px', color: '#F5F5F0' }}>{m.value}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee
        text={`${artifact.name} — ${artifact.designer} — ${artifact.year} — ${artifact.movement}`}
        bg={artifact.color}
        fg={artifact.accent}
      />

      {/* ── STORY ── */}
      <section style={{ background: '#0A0A0A', padding: '14vh 6vw', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8vw', alignItems: 'start' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
        >
          <SectionLabel text="THE STORY" />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(16px, 2vw, 22px)', lineHeight: 1.65, color: 'rgba(245,245,240,0.8)', fontWeight: 300 }}>
            {artifact.story}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15 }}
        >
          <SectionLabel text="HISTORICAL IMPORTANCE" />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(16px, 2vw, 22px)', lineHeight: 1.65, color: 'rgba(245,245,240,0.8)', fontWeight: 300 }}>
            {artifact.importance}
          </div>
        </motion.div>
      </section>

      {/* ── WHY ICONIC ── */}
      <section style={{ background: artifact.color, padding: '14vh 6vw', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-4vw', top: '-6vw', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(80px, 20vw, 280px)', lineHeight: 1, color: 'transparent', WebkitTextStroke: `1px ${artifact.accent}22`, pointerEvents: 'none', letterSpacing: '-0.05em' }}>
          ICONIC
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
          style={{ maxWidth: '70%', position: 'relative', zIndex: 1 }}
        >
          <SectionLabel text="WHY IT BECAME ICONIC" color={`${artifact.accent}60`} />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(22px, 4vw, 54px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: artifact.accent }}>
            {artifact.iconic}
          </div>
        </motion.div>
      </section>

      {/* ── MATERIALS & MANUFACTURING ── */}
      <section style={{ background: '#111', padding: '14vh 6vw', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8vw' }}>
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <SectionLabel text="MATERIALS" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {artifact.materials.map((mat, i) => (
              <motion.div
                key={mat}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
              >
                <div style={{ width: '6px', height: '6px', background: artifact.color, borderRadius: '50%', flexShrink: 0 }} />
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 'clamp(14px, 1.8vw, 20px)', color: '#F5F5F0' }}>{mat}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
          <SectionLabel text="HOW IT'S MADE" />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(14px, 1.8vw, 20px)', lineHeight: 1.7, color: 'rgba(245,245,240,0.7)', fontWeight: 300 }}>
            {artifact.manufacturing}
          </div>
        </motion.div>
      </section>

      {/* ── FACTS ── */}
      <section style={{ background: '#0A0A0A', padding: '14vh 6vw' }}>
        <SectionLabel text="INTERESTING FACTS" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          {artifact.facts.map((fact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              style={{ borderLeft: `2px solid ${artifact.color}`, paddingLeft: '20px' }}
            >
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: artifact.color, marginBottom: '10px' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(13px, 1.5vw, 17px)', lineHeight: 1.6, color: 'rgba(245,245,240,0.75)', fontWeight: 300 }}>
                {fact}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MUSEUMS ── */}
      <section style={{ background: '#111', padding: '10vh 6vw' }}>
        <SectionLabel text={`WHERE TO SEE THE ${artifact.name.toUpperCase()}`} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {artifact.museums.map(m => (
            <Tag key={m} bg="transparent" fg="#F5F5F0">
              <span style={{ border: '1px solid rgba(245,245,240,0.2)', padding: '6px 16px', display: 'block' }}>{m}</span>
            </Tag>
          ))}
          <Tag bg={artifact.inProduction ? '#00AA55' : '#888'} fg="#F5F5F0">
            {artifact.inProduction ? '✓ STILL IN PRODUCTION' : 'DISCONTINUED'}
          </Tag>
        </div>
      </section>

      {/* ── MOVEMENT ── */}
      <section style={{ background: '#0A0A0A', padding: '10vh 6vw', borderTop: '1px solid rgba(245,245,240,0.06)' }}>
        <SectionLabel text="DESIGN MOVEMENT" />
        <motion.div
          onClick={() => navigate(`/movements/${artifact.movementId}`)}
          whileHover={{ x: 10 }}
          style={{ cursor: 'none', display: 'inline-block' }}
        >
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 6vw, 80px)', letterSpacing: '-0.04em', color: artifact.color }}>
            {artifact.movement} →
          </div>
        </motion.div>
      </section>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section style={{ background: '#0A0A0A', padding: '10vh 6vw', borderTop: '1px solid rgba(245,245,240,0.06)' }}>
          <SectionLabel text="RELATED OBJECTS" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {related.map(r => r && (
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
