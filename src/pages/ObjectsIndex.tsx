import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { artifacts } from '../data/artifacts';
import { SectionLabel } from '../components/UI';
import { imageService } from '../services/imageService';
import { useArtifactImage } from '../hooks/useImage';
import MuseumImage from '../components/MuseumImage';

const CATS = ['ALL', 'CHAIR', 'SOFA', 'TABLE', 'LIGHTING', 'STORAGE', 'DECORATIVE'];

export default function ObjectsIndex() {
  const navigate = useNavigate();
  const [active, setActive] = useState('ALL');

  useEffect(() => {
    imageService.prefetch('artifact', artifacts.map(a => a.id));
  }, []);

  const filtered = active === 'ALL'
    ? artifacts
    : artifacts.filter(a => a.category.toUpperCase() === active);

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>

      {/* Header */}
      <section style={{ padding: '18vh 6vw 8vh', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-4vw', bottom: '-8vw', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(100px, 24vw, 360px)', lineHeight: 1, color: 'transparent', WebkitTextStroke: '1px rgba(245,245,240,0.04)', pointerEvents: 'none', letterSpacing: '-0.06em' }}>
          OBJECTS
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <SectionLabel text={`THE ARCHIVE — ${artifacts.length} OBJECTS`} />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(40px, 9vw, 120px)', lineHeight: 0.88, letterSpacing: '-0.05em', color: '#F5F5F0' }}>
            THE<br /><span style={{ color: '#FF4D00' }}>COLLECTION</span>
          </div>
        </motion.div>
      </section>

      {/* Filter tabs */}
      <div style={{ padding: '0 6vw 6vh', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {CATS.map(cat => (
          <motion.button
            key={cat}
            onClick={() => setActive(cat)}
            whileHover={{ y: -2 }}
            style={{
              fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.18em',
              padding: '10px 20px', border: 'none', cursor: 'none',
              background: active === cat ? '#FF4D00' : 'rgba(245,245,240,0.07)',
              color: active === cat ? '#0A0A0A' : 'rgba(245,245,240,0.6)',
              transition: 'all 0.2s',
            }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Grid list */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ padding: '0 6vw 14vh' }}
        >
          {filtered.map((artifact, i) => (
            <ArtifactRow
              key={artifact.id}
              artifact={artifact}
              index={i}
              onClick={() => navigate(`/objects/${artifact.id}`)}
            />
          ))}
          <div style={{ borderTop: '1px solid rgba(245,245,240,0.07)' }} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ArtifactRow({ artifact, index, onClick }: {
  artifact: typeof artifacts[0];
  index: number;
  onClick: () => void;
}) {
  const img = useArtifactImage(artifact.id);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ x: 14 }}
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(245,245,240,0.07)', padding: '28px 0', cursor: 'none', position: 'relative' }}
    >
      {/* Thumbnail on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.9 }}
        transition={{ duration: 0.2 }}
        style={{ position: 'absolute', left: '370px', top: '-8px', width: '90px', height: '110px', zIndex: 10, pointerEvents: 'none', overflow: 'hidden' }}
      >
        <MuseumImage image={img} aspect="4/5" fit="cover" accentColor={artifact.color} style={{ width: '100%', height: '100%' }} />
      </motion.div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ width: '10px', height: '10px', background: artifact.color, borderRadius: '50%', flexShrink: 0 }} />
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: 'rgba(245,245,240,0.25)', minWidth: '28px' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 3vw, 40px)', letterSpacing: '-0.03em', color: '#F5F5F0', lineHeight: 1 }}>
            {artifact.name}
          </div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(245,245,240,0.35)', marginTop: '6px' }}>
            {artifact.designer}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: 'rgba(245,245,240,0.3)' }}>{artifact.year}</span>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.12em', background: artifact.color, color: artifact.accent, padding: '4px 10px' }}>
          {artifact.category.toUpperCase()}
        </span>
        <span style={{ color: '#FF4D00', fontSize: '18px' }}>→</span>
      </div>
    </motion.div>
  );
}
