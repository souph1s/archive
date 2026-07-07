import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { techniques, getTechniqueById } from '../data/manufacturing';
import { BackBtn, Marquee, SectionLabel, Tag } from '../components/UI';

// ── INDEX ─────────────────────────────────────────────────────
export function ManufacturingIndex() {
  const navigate = useNavigate();
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <section style={{ padding: '18vh 6vw 8vh', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-4vw', bottom: '-6vw', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(60px, 18vw, 280px)', lineHeight: 1, color: 'transparent', WebkitTextStroke: '1px rgba(245,245,240,0.04)', pointerEvents: 'none', letterSpacing: '-0.06em' }}>
          PROCESS
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <SectionLabel text={`MANUFACTURING — ${techniques.length} TECHNIQUES`} />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(38px, 8vw, 110px)', lineHeight: 0.88, letterSpacing: '-0.05em', color: '#F5F5F0' }}>
            HOW<br /><span style={{ color: '#FF4D00' }}>IT'S MADE</span>
          </div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 300, fontSize: 'clamp(14px, 1.8vw, 20px)', color: 'rgba(245,245,240,0.5)', marginTop: '32px', maxWidth: '500px', lineHeight: 1.6 }}>
            The processes behind the objects. Understanding manufacture is understanding design — every great piece was shaped by what was possible to make.
          </div>
        </motion.div>
      </section>

      {/* Technique list */}
      <div style={{ padding: '0 6vw 14vh' }}>
        {techniques.map((t, i) => (
          <motion.div key={t.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            onClick={() => navigate(`/manufacturing/${t.id}`)}
            whileHover={{ x: 14 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(245,245,240,0.07)', padding: '28px 0', cursor: 'none' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ width: '10px', height: '10px', background: t.color, borderRadius: '50%', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: 'rgba(245,245,240,0.22)', minWidth: '28px' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 3vw, 42px)', letterSpacing: '-0.03em', color: '#F5F5F0', lineHeight: 1 }}>
                  {t.name}
                </div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(245,245,240,0.32)', marginTop: '6px' }}>
                  {t.era} — {t.materials.slice(0, 2).join(', ')}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <Tag bg={t.still_used ? '#00AA5520' : '#55555520'} fg={t.still_used ? '#00AA55' : '#888'}>
                {t.still_used ? 'ACTIVE' : 'HISTORIC'}
              </Tag>
              <span style={{ color: '#FF4D00', fontSize: '18px' }}>→</span>
            </div>
          </motion.div>
        ))}
        <div style={{ borderTop: '1px solid rgba(245,245,240,0.07)' }} />
      </div>
    </div>
  );
}

// ── DETAIL ────────────────────────────────────────────────────
export function TechniquePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const technique = getTechniqueById(id || '');

  if (!technique) return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#FF4D00', fontFamily: 'Space Mono, monospace' }}>TECHNIQUE NOT FOUND</div>
    </div>
  );

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ minHeight: '85vh', background: technique.color, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12vh 6vw 8vh' }}>
        <div style={{ position: 'absolute', top: '-6vw', right: '-4vw', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(80px, 22vw, 340px)', lineHeight: 1, color: 'transparent', WebkitTextStroke: `1px ${technique.accent}08`, pointerEvents: 'none', letterSpacing: '-0.06em' }}>
          PROCESS
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ position: 'absolute', top: '100px', left: '6vw', zIndex: 10 }}>
          <BackBtn label="← MANUFACTURING" to="/manufacturing" />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Tag bg={`${technique.accent}15`} fg={technique.accent}>{technique.era}</Tag>
            <Tag bg={technique.still_used ? '#00AA5530' : '#55555530'} fg={technique.still_used ? '#00AA55' : '#aaa'}>
              {technique.still_used ? '✓ STILL IN USE' : 'HISTORIC'}
            </Tag>
          </div>
        </motion.div>

        <div style={{ overflow: 'hidden' }}>
          {technique.name.split(' ').map((w, i) => (
            <motion.div key={i}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5 + i * 0.09, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              style={{ display: 'block', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 8vw, 110px)', lineHeight: 0.88, letterSpacing: '-0.05em', color: technique.accent }}
            >
              {w}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{ marginTop: '36px', maxWidth: '55%' }}>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 300, fontSize: 'clamp(15px, 2vw, 22px)', lineHeight: 1.5, color: `${technique.accent}70` }}>
            {technique.tagline}
          </div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <Marquee text={`${technique.name} — ${technique.era} — ${technique.materials.join(' — ')}`} bg="#0A0A0A" fg={technique.color} />

      {/* OVERVIEW */}
      <section style={{ background: '#0A0A0A', padding: '14vh 6vw' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <SectionLabel text="OVERVIEW" />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(16px, 2vw, 24px)', lineHeight: 1.65, color: 'rgba(245,245,240,0.82)', fontWeight: 300, maxWidth: '72%' }}>
            {technique.overview}
          </div>
        </motion.div>
      </section>

      {/* STEP-BY-STEP PROCESS */}
      <section style={{ background: '#111', padding: '14vh 6vw' }}>
        <SectionLabel text="THE PROCESS — STEP BY STEP" />
        <div style={{ position: 'relative', paddingLeft: '40px' }}>
          <div style={{ position: 'absolute', left: '6px', top: 0, bottom: 0, width: '1px', background: 'rgba(245,245,240,0.07)' }} />
          {technique.process.map((step, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.65 }}
              style={{ position: 'relative', marginBottom: '36px' }}
            >
              <div style={{ position: 'absolute', left: '-37px', top: '4px', width: '12px', height: '12px', background: technique.color, borderRadius: '50%', flexShrink: 0 }} />
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.18em', color: technique.color, marginBottom: '8px' }}>
                STEP {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(14px, 1.7vw, 19px)', lineHeight: 1.65, color: 'rgba(245,245,240,0.8)', fontWeight: 300 }}>
                {step}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ADVANTAGES + CHALLENGES */}
      <section style={{ background: technique.color, padding: '14vh 6vw', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6vw' }}>
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <SectionLabel text="ADVANTAGES" color={`${technique.accent}45`} />
          {technique.advantages.map((adv, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '14px 0', borderBottom: `1px solid ${technique.accent}15` }}
            >
              <div style={{ width: '6px', height: '6px', background: technique.accent, borderRadius: '50%', marginTop: '8px', flexShrink: 0, opacity: 0.6 }} />
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(13px, 1.5vw, 17px)', color: technique.accent, lineHeight: 1.5 }}>{adv}</span>
            </motion.div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
          <SectionLabel text="CHALLENGES" color={`${technique.accent}45`} />
          {technique.challenges.map((ch, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '14px 0', borderBottom: `1px solid ${technique.accent}15` }}
            >
              <div style={{ width: '6px', height: '6px', border: `1px solid ${technique.accent}50`, borderRadius: '50%', marginTop: '8px', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(13px, 1.5vw, 17px)', color: `${technique.accent}80`, lineHeight: 1.5 }}>{ch}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* MATERIALS USED */}
      <section style={{ background: '#111', padding: '12vh 6vw' }}>
        <SectionLabel text="MATERIALS" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {technique.materials.map((mat, i) => (
            <motion.span key={i}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', border: `1px solid ${technique.color}50`, color: technique.color, padding: '8px 18px' }}
            >
              {mat}
            </motion.span>
          ))}
        </div>
      </section>

      {/* FAMOUS OBJECTS */}
      <section style={{ background: '#0A0A0A', padding: '12vh 6vw', borderTop: '1px solid rgba(245,245,240,0.06)' }}>
        <SectionLabel text="MADE WITH THIS TECHNIQUE" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {technique.famousObjects.map((obj, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.6 }}
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 'clamp(15px, 2.2vw, 28px)', color: technique.color, padding: '16px 0', borderBottom: '1px solid rgba(245,245,240,0.06)', letterSpacing: '-0.02em' }}
            >
              {obj}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
