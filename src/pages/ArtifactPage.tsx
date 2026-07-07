import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getArtifactById, artifacts } from '../data/artifacts';
import { BackBtn, Marquee, SectionLabel, Tag, RelatedCard } from '../components/UI';
import MuseumImage, { MuseumGallery } from '../components/MuseumImage';
import { useArtifactImage, useArtifactGallery } from '../hooks/useImage';

export default function ArtifactPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const artifact = getArtifactById(id || '');
  const heroImage = useArtifactImage(id || '');
  const gallery = useArtifactGallery(id || '');

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
      <section style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* Left: text */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12vh 5vw 8vh 6vw', position: 'relative', zIndex: 2 }}>
          {/* Ghost year */}
          <div style={{ position: 'absolute', bottom: '-6vw', left: '-2vw', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(100px, 22vw, 360px)', lineHeight: 1, letterSpacing: '-0.06em', color: 'transparent', WebkitTextStroke: '1px rgba(245,245,240,0.05)', pointerEvents: 'none' }}>
            {artifact.year}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ marginBottom: '8px' }}>
            <BackBtn label="← OBJECTS" to="/objects" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} style={{ marginBottom: '24px', marginTop: '32px' }}>
            <Tag bg={artifact.color} fg={artifact.accent}>{artifact.category.toUpperCase()}</Tag>
          </motion.div>

          <div style={{ overflow: 'hidden' }}>
            {artifact.name.split(' ').map((word, i) => (
              <motion.div key={i}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
                style={{ display: 'block', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 5.5vw, 90px)', lineHeight: 0.88, letterSpacing: '-0.05em', color: '#F5F5F0' }}>
                {word}
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }}
            style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { label: 'DESIGNER', value: artifact.designer },
              { label: 'YEAR', value: String(artifact.year) },
              { label: 'MANUFACTURER', value: artifact.manufacturer },
              { label: 'MOVEMENT', value: artifact.movement },
            ].map(m => (
              <div key={m.label} style={{ display: 'flex', gap: '16px', alignItems: 'baseline' }}>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(245,245,240,0.3)', minWidth: '100px' }}>{m.label}</div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 'clamp(12px, 1.3vw, 16px)', color: '#F5F5F0' }}>{m.value}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: hero image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: 'relative' }}
        >
          {/* Color slab behind image */}
          <div style={{ position: 'absolute', inset: 0, background: artifact.color, opacity: 0.12 }} />
          <MuseumImage
            image={heroImage}
            aspect="3/4"
            fit="cover"
            position="center top"
            showCredit
            accentColor={artifact.color}
            style={{ height: '100%', width: '100%' }}
          />
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee
        text={`${artifact.name} — ${artifact.designer} — ${artifact.year} — ${artifact.movement}`}
        bg={artifact.color}
        fg={artifact.accent}
      />

      {/* ── STORY + GALLERY ── */}
      <section style={{ background: '#0A0A0A', padding: '14vh 6vw', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8vw', alignItems: 'start' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <SectionLabel text="THE STORY" />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(15px, 1.7vw, 21px)', lineHeight: 1.7, color: 'rgba(245,245,240,0.8)', fontWeight: 300, marginBottom: '40px' }}>
            {artifact.story}
          </div>
          <SectionLabel text="HISTORICAL IMPORTANCE" />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(15px, 1.7vw, 21px)', lineHeight: 1.7, color: 'rgba(245,245,240,0.8)', fontWeight: 300 }}>
            {artifact.importance}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15 }}>
          <SectionLabel text="GALLERY" />
          <MuseumGallery gallery={gallery} accentColor={artifact.color} />
        </motion.div>
      </section>

      {/* ── WHY ICONIC ── */}
      <section style={{ background: artifact.color, padding: '14vh 6vw', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-4vw', top: '-6vw', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(80px, 20vw, 280px)', lineHeight: 1, color: 'transparent', WebkitTextStroke: `1px ${artifact.accent}18`, pointerEvents: 'none', letterSpacing: '-0.05em' }}>ICONIC</div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ maxWidth: '72%', position: 'relative', zIndex: 1 }}>
          <SectionLabel text="WHY IT BECAME ICONIC" color={`${artifact.accent}55`} />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(20px, 3.5vw, 50px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: artifact.accent }}>
            {artifact.iconic}
          </div>
        </motion.div>
      </section>

      {/* ── MATERIALS & MANUFACTURING ── */}
      <section style={{ background: '#111', padding: '14vh 6vw', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8vw' }}>
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <SectionLabel text="MATERIALS" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {artifact.materials.map((mat, i) => (
              <motion.div key={mat} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}
                style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '6px', height: '6px', background: artifact.color, borderRadius: '50%', flexShrink: 0 }} />
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 'clamp(14px, 1.6vw, 20px)', color: '#F5F5F0' }}>{mat}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
          <SectionLabel text="HOW IT'S MADE" />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(14px, 1.6vw, 19px)', lineHeight: 1.75, color: 'rgba(245,245,240,0.7)', fontWeight: 300 }}>
            {artifact.manufacturing}
          </div>
        </motion.div>
      </section>

      {/* ── FACTS ── */}
      <section style={{ background: '#0A0A0A', padding: '14vh 6vw' }}>
        <SectionLabel text="INTERESTING FACTS" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          {artifact.facts.map((fact, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09, duration: 0.7 }}
              style={{ borderLeft: `2px solid ${artifact.color}`, paddingLeft: '20px' }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: artifact.color, marginBottom: '10px' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(13px, 1.4vw, 17px)', lineHeight: 1.65, color: 'rgba(245,245,240,0.75)', fontWeight: 300 }}>
                {fact}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MUSEUMS ── */}
      <section style={{ background: '#111', padding: '10vh 6vw' }}>
        <SectionLabel text={`WHERE TO SEE IT`} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          {artifact.museums.map(m => (
            <span key={m} style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.1em', border: '1px solid rgba(245,245,240,0.18)', padding: '8px 18px', color: 'rgba(245,245,240,0.65)' }}>{m}</span>
          ))}
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.1em', background: artifact.inProduction ? '#00AA55' : '#555', color: '#F5F5F0', padding: '8px 18px' }}>
            {artifact.inProduction ? '✓ STILL IN PRODUCTION' : 'DISCONTINUED'}
          </span>
        </div>
      </section>

      {/* ── MOVEMENT LINK ── */}
      <section style={{ background: '#0A0A0A', padding: '10vh 6vw', borderTop: '1px solid rgba(245,245,240,0.06)' }}>
        <SectionLabel text="DESIGN MOVEMENT" />
        <motion.div onClick={() => navigate(`/movements/${artifact.movementId}`)} whileHover={{ x: 10 }} style={{ cursor: 'none', display: 'inline-block' }}>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(26px, 5.5vw, 78px)', letterSpacing: '-0.04em', color: artifact.color }}>
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
              <RelatedCard key={r.id} name={r.name} sub={`${r.designer} — ${r.year}`} color={r.color} onClick={() => navigate(`/objects/${r.id}`)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
