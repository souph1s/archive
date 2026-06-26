import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import './index.css';

const OBJECTS = [
  { name: 'EAMES LOUNGE CHAIR', year: '1956', designer: 'Charles & Ray Eames', color: '#FF4D00', accent: '#0A0A0A' },
  { name: 'BARCELONA CHAIR', year: '1929', designer: 'Ludwig Mies van der Rohe', color: '#0028FF', accent: '#F5F5F0' },
  { name: 'EGG CHAIR', year: '1958', designer: 'Arne Jacobsen', color: '#E8FF00', accent: '#0A0A0A' },
  { name: 'PANTON CHAIR', year: '1960', designer: 'Verner Panton', color: '#FF0022', accent: '#F5F5F0' },
  { name: 'ARCO LAMP', year: '1962', designer: 'Achille & Pier Giacomo Castiglioni', color: '#F5F5F0', accent: '#0A0A0A' },
];

const todayObject = OBJECTS[new Date().getDay() % OBJECTS.length];

const QUOTES = [
  { text: 'Less, but better.', author: 'Dieter Rams' },
  { text: 'The details are not the details.\nThey make the design.', author: 'Charles Eames' },
  { text: 'Design is not just what it looks like.\nDesign is how it works.', author: 'Steve Jobs' },
];

function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX - 6 + 'px';
        cursorRef.current.style.top = e.clientY - 6 + 'px';
      }
      if (followerRef.current) {
        setTimeout(() => {
          if (followerRef.current) {
            followerRef.current.style.left = e.clientX - 20 + 'px';
            followerRef.current.style.top = e.clientY - 20 + 'px';
          }
        }, 80);
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}

function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '24px 40px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', mixBlendMode: 'difference',
      }}
    >
      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.2em', color: '#F5F5F0' }}>
        FORM & IDEA
      </span>
      <div style={{ display: 'flex', gap: '32px' }}>
        {['EXHIBITION', 'OBJECTS', 'HISTORY', 'INDEX'].map(item => (
          <span key={item} style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: '#F5F5F0', cursor: 'none', opacity: 0.7 }}>
            {item}
          </span>
        ))}
      </div>
    </motion.nav>
  );
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 100) { clearInterval(interval); setTimeout(onComplete, 300); return 100; }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      style={{ position: 'fixed', inset: 0, background: '#0A0A0A', zIndex: 9000, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '40px' }}
    >
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.2em', color: '#FF4D00' }}>FORM & IDEA — DIGITAL EXHIBITION</div>
      <div>
        <motion.div
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, lineHeight: 0.85, letterSpacing: '-0.04em', color: '#F5F5F0' }}
        >
          {['DESIGN', 'HIS', 'TORY'].map((word, i) => (
            <motion.div
              key={word}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              style={{ fontSize: 'clamp(60px, 15vw, 200px)', display: 'block' }}
            >
              {word}
            </motion.div>
          ))}
        </motion.div>
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: 'rgba(245,245,240,0.4)' }}>
            LOADING EXPERIENCE
          </div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#FF4D00' }}>
            {String(count).padStart(3, '0')}%
          </div>
        </div>
        <div style={{ marginTop: '12px', height: '1px', background: 'rgba(245,245,240,0.1)', position: 'relative' }}>
          <motion.div style={{ position: 'absolute', top: 0, left: 0, height: '1px', background: '#FF4D00', width: count + '%', transition: 'width 0.1s ease' }} />
        </div>
      </div>
    </motion.div>
  );
}

function HeroChapter() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} style={{ height: '100vh', background: '#0A0A0A', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      {/* BIG YEAR */}
      <motion.div
        style={{ position: 'absolute', bottom: '-8vw', right: '-2vw', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(120px, 28vw, 420px)', lineHeight: 1, letterSpacing: '-0.06em', color: 'transparent', WebkitTextStroke: '1px rgba(245,245,240,0.07)', pointerEvents: 'none', y }}
      >
        {todayObject.year}
      </motion.div>

      {/* Object color slab */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.5, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        style={{ position: 'absolute', top: '15%', right: 0, width: '45vw', height: '70vh', background: todayObject.color, transformOrigin: 'right', zIndex: 1 }}
      />

      {/* Object silhouette placeholder */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3, duration: 1, ease: [0.76, 0, 0.24, 1] }}
        style={{ position: 'absolute', right: '5vw', top: '10%', width: '38vw', height: '80vh', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <ChairSVG color={todayObject.accent} />
      </motion.div>

      {/* Main typography */}
      <motion.div style={{ position: 'relative', zIndex: 3, paddingLeft: '6vw', opacity }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.6 }}
          style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.25em', color: todayObject.color, marginBottom: '32px' }}
        >
          OBJECT OF THE DAY — {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}
        </motion.div>

        <div style={{ overflow: 'hidden' }}>
          {todayObject.name.split(' ').map((word, i) => (
            <motion.div
              key={word + i}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 2.7 + i * 0.1, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              style={{ display: 'block', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 7.5vw, 110px)', lineHeight: 0.9, letterSpacing: '-0.04em', color: '#F5F5F0' }}
            >
              {word}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '20px' }}
        >
          <div style={{ width: '40px', height: '1px', background: '#F5F5F0', opacity: 0.4 }} />
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '0.1em', color: 'rgba(245,245,240,0.5)' }}>
            {todayObject.designer}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4, duration: 1 }}
          style={{ position: 'absolute', bottom: '-40vh', left: 0 }}
        >
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(245,245,240,0.3)', marginBottom: '12px' }}>SCROLL TO EXPLORE</div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{ width: '1px', height: '60px', background: 'rgba(245,245,240,0.3)', marginLeft: '4px' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function ChairSVG({ color }: { color: string }) {
  // Abstract chair silhouette
  return (
    <svg viewBox="0 0 400 500" fill="none" style={{ width: '100%', height: '100%', maxHeight: '75vh' }}>
      <motion.g
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.1, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Seat */}
        <rect x="60" y="220" width="280" height="50" rx="8" fill={color} opacity="0.9" />
        {/* Back */}
        <rect x="80" y="60" width="240" height="170" rx="60" fill={color} opacity="0.85" />
        {/* Legs */}
        <rect x="90" y="268" width="18" height="180" rx="9" fill={color} opacity="0.7" />
        <rect x="292" y="268" width="18" height="180" rx="9" fill={color} opacity="0.7" />
        {/* Armrest hints */}
        <rect x="40" y="210" width="70" height="14" rx="7" fill={color} opacity="0.5" />
        <rect x="290" y="210" width="70" height="14" rx="7" fill={color} opacity="0.5" />
        {/* Small decorative dot */}
        <circle cx="200" cy="145" r="12" fill={todayObject.color} opacity="0.6" />
      </motion.g>
    </svg>
  );
}

function MarqueeChapter() {
  const text = '— FORM — FUNCTION — BEAUTY — VISION — CRAFT — LEGACY — FORM — FUNCTION — BEAUTY — VISION — CRAFT — LEGACY ';
  return (
    <section style={{ background: todayObject.color, padding: '32px 0', overflow: 'hidden', position: 'relative', zIndex: 5 }}>
      <motion.div
        animate={{ x: [0, -2000] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
        style={{ whiteSpace: 'nowrap', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 5vw, 56px)', letterSpacing: '-0.02em', color: todayObject.accent, lineHeight: 1 }}
      >
        {text}{text}
      </motion.div>
    </section>
  );
}

function BigNumberChapter() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const xReverse = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} style={{ background: '#0A0A0A', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', position: 'relative', paddingTop: '10vh', paddingBottom: '10vh' }}>

      {/* Top label */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ paddingLeft: '6vw', marginBottom: '8vh' }}
      >
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.25em', color: 'rgba(245,245,240,0.4)', marginBottom: '16px' }}>
          CHAPTER 01 — THE OBJECT
        </div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 5vw, 72px)', letterSpacing: '-0.04em', color: '#F5F5F0', maxWidth: '600px', lineHeight: 1.0 }}>
          Objects that changed<br />how we live.
        </div>
      </motion.div>

      {/* Giant numbers sliding */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {['20', '—', 'TH'].map((chunk, i) => (
          <motion.div
            key={chunk}
            style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(100px, 25vw, 380px)', lineHeight: 0.85, letterSpacing: '-0.06em', color: i === 1 ? '#FF4D00' : 'transparent', WebkitTextStroke: i === 1 ? 'none' : '1px rgba(245,245,240,0.15)', display: 'block', paddingLeft: i % 2 === 0 ? '6vw' : '20vw', x: i % 2 === 0 ? x : xReverse }}
          >
            {chunk}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{ paddingLeft: '6vw', paddingRight: '6vw', marginTop: '8vh', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
      >
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(245,245,240,0.3)', maxWidth: '320px', lineHeight: 1.8 }}>
          A century of radical thinking.<br />
          Furniture as philosophy.<br />
          Objects as manifestos.
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(60px, 10vw, 140px)', color: '#FF4D00', lineHeight: 1, letterSpacing: '-0.04em' }}>
            CENTURY
          </span>
        </div>
      </motion.div>
    </section>
  );
}

function QuoteChapter({ quote, index }: { quote: typeof QUOTES[0]; index: number }) {
  const bg = index === 0 ? '#0028FF' : index === 1 ? '#E8FF00' : '#0A0A0A';
  const fg = index === 0 ? '#F5F5F0' : index === 1 ? '#0A0A0A' : '#F5F5F0';
  const accent = index === 0 ? '#FF4D00' : index === 1 ? '#FF0022' : '#E8FF00';

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);

  return (
    <motion.section
      ref={ref}
      style={{ scale, background: bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10vh 6vw', position: 'relative', overflow: 'hidden' }}
    >
      {/* Big decorative number */}
      <div style={{ position: 'absolute', top: '-5vw', right: '-2vw', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(150px, 35vw, 500px)', lineHeight: 1, letterSpacing: '-0.06em', color: 'transparent', WebkitTextStroke: `1px ${fg}22`, pointerEvents: 'none' }}>
        0{index + 1}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.25em', color: accent, marginBottom: '60px' }}
      >
        QUOTE — 0{index + 1}
      </motion.div>

      <div style={{ overflow: 'hidden', maxWidth: '85%' }}>
        {quote.text.split('\n').map((line, i) => (
          <motion.div
            key={i}
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 1, ease: [0.76, 0, 0.24, 1] }}
            style={{ display: 'block', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 6.5vw, 90px)', letterSpacing: '-0.04em', lineHeight: 0.95, color: fg }}
          >
            {line}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{ marginTop: '60px', display: 'flex', alignItems: 'center', gap: '20px' }}
      >
        <div style={{ width: '40px', height: '1px', background: fg, opacity: 0.4 }} />
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '0.15em', color: fg, opacity: 0.6 }}>
          — {quote.author.toUpperCase()}
        </span>
      </motion.div>
    </motion.section>
  );
}

function DesignersChapter() {
  const designers = [
    { name: 'CHARLES EAMES', years: '1907—1978', tag: 'USA' },
    { name: 'DIETER RAMS', years: '1932—', tag: 'DE' },
    { name: 'ARNE JACOBSEN', years: '1902—1971', tag: 'DK' },
    { name: 'VERNER PANTON', years: '1926—1998', tag: 'DK' },
    { name: 'MIES VAN DER ROHE', years: '1886—1969', tag: 'DE' },
  ];

  return (
    <section style={{ background: '#F5F5F0', color: '#0A0A0A', minHeight: '100vh', padding: '12vh 6vw' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.25em', color: 'rgba(10,10,10,0.4)', marginBottom: '10vh' }}
      >
        CHAPTER 02 — THE MASTERS
      </motion.div>

      <div style={{ position: 'relative' }}>
        {designers.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            whileHover={{ x: 20 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid rgba(10,10,10,0.12)', padding: '28px 0', cursor: 'none' }}
          >
            <div style={{ display: 'flex', gap: '24px', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: 'rgba(10,10,10,0.3)', minWidth: '28px' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(24px, 4.5vw, 64px)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {d.name}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '40px', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: 'rgba(10,10,10,0.4)' }}>{d.years}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', background: '#FF4D00', color: '#F5F5F0', padding: '4px 10px', borderRadius: '2px' }}>{d.tag}</span>
            </div>
          </motion.div>
        ))}
        <div style={{ borderTop: '1px solid rgba(10,10,10,0.12)' }} />
      </div>

      {/* Floating big text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ marginTop: '8vh', display: 'flex', justifyContent: 'flex-end' }}
      >
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(60px, 12vw, 180px)', letterSpacing: '-0.05em', lineHeight: 0.85, color: '#0A0A0A', textAlign: 'right' }}>
          MASTERS<br />
          <span style={{ color: '#FF4D00' }}>OF</span><br />
          FORM
        </div>
      </motion.div>
    </section>
  );
}

function ImmersivePhotoChapter() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={ref} style={{ background: '#0A0A0A', minHeight: '130vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Big abstract geometric placeholder for "photography" */}
      

      {/* <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 6vw' }}
      >
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(60px, 16vw, 220px)', lineHeight: 0.85, letterSpacing: '-0.06em', color: '#F5F5F0' }}>
          PURE<br />
          <span style={{ color: '#FF4D00' }}>FORM</span>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', letterSpacing: '0.1em', color: 'rgba(245,245,240,0.4)', marginTop: '40px', maxWidth: '400px', margin: '40px auto 0', lineHeight: 1.8 }}
        >
          When function is perfected,<br />beauty becomes inevitable.
        </motion.p>
      </motion.div> */}
    </section>
  );
}

function ObjectGridChapter() {
  const items = OBJECTS.map((o, i) => ({
    ...o,
    offset: ['-5vw', '8vw', '-3vw', '12vw', '0vw'][i],
    size: ['clamp(28px,5vw,72px)', 'clamp(40px,7vw,96px)', 'clamp(24px,4vw,56px)', 'clamp(36px,6vw,84px)', 'clamp(32px,5.5vw,78px)'][i]
  }));

  return (
    <section style={{ background: '#0A0A0A', padding: '15vh 6vw', position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.25em', color: 'rgba(245,245,240,0.3)', marginBottom: '10vh' }}
      >
        CHAPTER 03 — THE COLLECTION
      </motion.div>

      <div style={{ position: 'relative' }}>
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: '4vw', marginBottom: '6vh', marginLeft: item.offset }}
          >
            <div style={{ width: '18px', height: '18px', background: item.color, borderRadius: '50%', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: item.size, letterSpacing: '-0.04em', lineHeight: 0.9, color: '#F5F5F0' }}>
                {item.name}
              </div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.12em', color: item.color, marginTop: '8px' }}>
                {item.designer} — {item.year}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ManifestoChapter() {
  const lines = [
    { text: 'DESIGN', color: '#F5F5F0', align: 'left', size: 'clamp(70px, 18vw, 260px)' },
    { text: 'IS NOT', color: '#FF4D00', align: 'center', size: 'clamp(50px, 14vw, 200px)' },
    { text: 'DECORATION.', color: '#E8FF00', align: 'right', size: 'clamp(40px, 11vw, 160px)' },
    { text: 'IT IS', color: 'transparent', align: 'left', size: 'clamp(60px, 15vw, 220px)', stroke: '1px rgba(245,245,240,0.3)' },
    { text: 'THOUGHT.', color: '#0028FF', align: 'center', size: 'clamp(80px, 19vw, 280px)' },
  ];

  return (
    <section style={{ background: '#0A0A0A', minHeight: '120vh', padding: '15vh 6vw', overflow: 'hidden' }}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: line.size, lineHeight: 0.88, letterSpacing: '-0.05em', color: line.color, WebkitTextStroke: line.stroke, textAlign: line.align as any, display: 'block', marginBottom: '2vh' }}
        >
          {line.text}
        </motion.div>
      ))}
    </section>
  );
}

function FooterChapter() {
  return (
    <section style={{ background: '#FF4D00', minHeight: '60vh', padding: '12vh 6vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(50px, 12vw, 160px)', letterSpacing: '-0.05em', lineHeight: 0.85, color: '#0A0A0A' }}
        >
          EXPLORE<br />
          THE <span style={{ color: '#F5F5F0' }}>ARCHIVE</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'none' }}
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            style={{ background: '#0A0A0A', color: '#F5F5F0', padding: '18px 40px', fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '0.15em', display: 'inline-block' }}
          >
            ENTER EXHIBITION →
          </motion.div>
        </motion.div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '10vh' }}>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(10,10,10,0.5)' }}>
          © FORM & IDEA — {new Date().getFullYear()}<br />
          DIGITAL EXHIBITION OF INDUSTRIAL DESIGN
        </div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 8vw, 110px)', letterSpacing: '-0.04em', color: '#0A0A0A', opacity: 0.15, lineHeight: 1 }}>
          F&I
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.07, smoothWheel: true });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    const rafId = requestAnimationFrame(raf);
    return () => { lenis.destroy(); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <div style={{ background: '#0A0A0A' }}>
      <div className="noise-overlay" />
      <Cursor />
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Nav />
          <HeroChapter />
          <MarqueeChapter />
          <BigNumberChapter />
          <QuoteChapter quote={QUOTES[0]} index={0} />
          <DesignersChapter />
          <QuoteChapter quote={QUOTES[1]} index={1} />
          <ImmersivePhotoChapter />
          <ObjectGridChapter />
          <ManifestoChapter />
          <QuoteChapter quote={QUOTES[2]} index={2} />
          <FooterChapter />
        </motion.div>
      )}
    </div>
  );
}
