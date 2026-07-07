import React, { useEffect, useRef, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import './index.css';

// Data
import { artifacts } from './data/artifacts';
import { designers } from './data/designers';
import { techniques } from './data/manufacturing';

// Pages
import ArtifactPage from './pages/ArtifactPage';
import ObjectsIndex from './pages/ObjectsIndex';
import { DesignersIndex, DesignerPage } from './pages/DesignerPages';
import { MovementsIndex, MovementPage } from './pages/MovementPages';
import TimelinePage from './pages/TimelinePage';
import { MaterialsIndex, MaterialPage } from './pages/MaterialPages';
import { ManufacturingIndex, TechniquePage } from './pages/ManufacturingPages';
import SearchPage from './pages/SearchPage';

// Shared UI
import { Cursor, Nav } from './components/UI';
import ScrollToTop from './components/ScrollToTop';
import MuseumImageComponent from './components/MuseumImage';
import { useMovementImage as useMovementImageHook } from './hooks/useImage';

// ── Daily object (from real data) ──────────────────────────
const FEATURED_IDS = [
  'eames-lounge-chair',
  'barcelona-chair',
  'egg-chair',
  'panton-chair',
  'arco-lamp',
  'wishbone-chair',
  'noguchi-table',
];
const todayArtifact = artifacts.find(a => a.id === FEATURED_IDS[new Date().getDay() % FEATURED_IDS.length])!;

// ── Quotes ──────────────────────────────────────────────────
const QUOTES = [
  { text: 'Less, but better.', author: 'Dieter Rams' },
  { text: 'The details are not the details.\nThey make the design.', author: 'Charles Eames' },
  { text: 'A chair is not finished until\nsomebody sits in it.', author: 'Hans Wegner' },
  { text: 'The role of the designer is that of\na good, thoughtful host.', author: 'Charles Eames' },
  { text: 'Everything is sculpture.', author: 'Isamu Noguchi' },
];

// ─────────────────────────────────────────────────────────────
// LOADING SCREEN
// ─────────────────────────────────────────────────────────────
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 100) { clearInterval(interval); setTimeout(onComplete, 300); return 100; }
        return Math.min(100, prev + Math.floor(Math.random() * 7) + 2);
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      style={{ position: 'fixed', inset: 0, background: '#0A0A0A', zIndex: 9000, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '36px 40px' }}
    >
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.2em', color: '#FF4D00' }}>
        FORM & IDEA — DIGITAL EXHIBITION
      </div>
      <div>
        <div style={{ overflow: 'hidden' }}>
          {['DESIGN', 'HIS', 'TORY'].map((word, i) => (
            <motion.div
              key={word}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.13, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(60px, 15vw, 210px)', lineHeight: 0.85, letterSpacing: '-0.05em', color: '#F5F5F0', display: 'block' }}
            >
              {word}
            </motion.div>
          ))}
        </div>
        <div style={{ marginTop: '44px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: 'rgba(245,245,240,0.35)' }}>LOADING EXPERIENCE</div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#FF4D00' }}>{String(count).padStart(3, '0')}%</div>
        </div>
        <div style={{ marginTop: '12px', height: '1px', background: 'rgba(245,245,240,0.08)' }}>
          <motion.div style={{ height: '100%', background: '#FF4D00', width: count + '%', transition: 'width 0.1s ease' }} />
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO CHAPTER
// ─────────────────────────────────────────────────────────────
function HeroChapter() {
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section ref={ref} style={{ height: '100vh', background: '#0A0A0A', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      {/* Ghost year */}
      <motion.div style={{ position: 'absolute', bottom: '-10vw', right: '-2vw', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(120px, 30vw, 450px)', lineHeight: 1, letterSpacing: '-0.06em', color: 'transparent', WebkitTextStroke: '1px rgba(245,245,240,0.06)', pointerEvents: 'none', y }}>
        {todayArtifact.year}
      </motion.div>

      {/* Color slab */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.4, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        style={{ position: 'absolute', top: '15%', right: 0, width: '44vw', height: '70vh', background: todayArtifact.color, transformOrigin: 'right', zIndex: 1 }}
      />

      {/* Abstract chair SVG */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.9, duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        style={{ position: 'absolute', right: '6vw', top: '10%', width: '36vw', height: '80vh', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <ChairSVG accent={todayArtifact.accent} highlight={todayArtifact.color} />
      </motion.div>

      {/* Text content */}
      <motion.div style={{ position: 'relative', zIndex: 3, paddingLeft: '6vw', opacity }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 0.7 }}
          style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.25em', color: todayArtifact.color, marginBottom: '28px' }}>
          OBJECT OF THE DAY — {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}
        </motion.div>

        <div style={{ overflow: 'hidden' }}>
          {todayArtifact.name.split(' ').map((word, i) => (
            <motion.div key={i}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 2.65 + i * 0.1, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              style={{ display: 'block', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 7.5vw, 108px)', lineHeight: 0.88, letterSpacing: '-0.05em', color: '#F5F5F0' }}>
              {word}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3.2, duration: 0.8 }}
          style={{ marginTop: '36px', display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{ width: '36px', height: '1px', background: '#F5F5F0', opacity: 0.35 }} />
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.12em', color: 'rgba(245,245,240,0.45)' }}>{todayArtifact.designer}</span>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }}
          onClick={() => navigate(`/objects/${todayArtifact.id}`)}
          whileHover={{ x: 6 }}
          style={{ marginTop: '40px', display: 'inline-flex', alignItems: 'center', gap: '12px', cursor: 'none' }}>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: todayArtifact.color }}>EXPLORE OBJECT →</span>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.6 }}
          style={{ position: 'absolute', bottom: '-38vh', left: 0 }}>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(245,245,240,0.25)', marginBottom: '12px' }}>SCROLL</div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{ width: '1px', height: '56px', background: 'rgba(245,245,240,0.2)', marginLeft: '2px' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function ChairSVG({ accent, highlight }: { accent: string; highlight: string }) {
  return (
    <svg viewBox="0 0 400 520" fill="none" style={{ width: '100%', height: '100%', maxHeight: '74vh' }}>
      <motion.g initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.1, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}>
        <rect x="70" y="60" width="260" height="180" rx="70" fill={accent} opacity="0.88" />
        <rect x="60" y="228" width="280" height="52" rx="9" fill={accent} opacity="0.92" />
        <rect x="40" y="208" width="72" height="15" rx="7" fill={accent} opacity="0.5" />
        <rect x="288" y="208" width="72" height="15" rx="7" fill={accent} opacity="0.5" />
        <rect x="92" y="278" width="18" height="192" rx="9" fill={accent} opacity="0.65" />
        <rect x="290" y="278" width="18" height="192" rx="9" fill={accent} opacity="0.65" />
        <circle cx="200" cy="152" r="14" fill={highlight} opacity="0.7" />
        <rect x="155" y="468" width="90" height="10" rx="5" fill={accent} opacity="0.2" />
      </motion.g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// MARQUEE CHAPTER
// ─────────────────────────────────────────────────────────────
function MarqueeChapter() {
  const text = '— FORM — FUNCTION — BEAUTY — VISION — CRAFT — LEGACY — OBJECT — MOVEMENT — MATERIAL — IDEA ';
  return (
    <section style={{ background: todayArtifact.color, padding: '28px 0', overflow: 'hidden' }}>
      <motion.div
        animate={{ x: [0, -2200] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        style={{ whiteSpace: 'nowrap', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(26px, 5vw, 54px)', letterSpacing: '-0.02em', color: todayArtifact.accent, lineHeight: 1 }}
      >
        {text}{text}
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// BIG NUMBER / CENTURY CHAPTER
// ─────────────────────────────────────────────────────────────
function CenturyChapter() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x1 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const x2 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} style={{ background: '#0A0A0A', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', padding: '10vh 0' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ paddingLeft: '6vw', marginBottom: '6vh' }}>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.25em', color: 'rgba(245,245,240,0.35)', marginBottom: '16px' }}>CHAPTER 01 — THE OBJECT</div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 5vw, 68px)', letterSpacing: '-0.04em', color: '#F5F5F0', lineHeight: 1 }}>Objects that changed<br />how we live.</div>
      </motion.div>

      {[['20', '#F5F5F0', '6vw', false], ['—', '#FF4D00', '22vw', true], ['TH', '#F5F5F0', '10vw', false]].map(([chunk, color, pad, rev], i) => (
        <motion.div
          key={String(i)}
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(100px, 26vw, 400px)', lineHeight: 0.84, letterSpacing: '-0.06em', color: String(color) === '#FF4D00' ? '#FF4D00' : 'transparent', WebkitTextStroke: String(color) === '#FF4D00' ? 'none' : '1px rgba(245,245,240,0.12)', display: 'block', paddingLeft: String(pad), x: rev ? x2 : x1 }}
        >
          {String(chunk)}
        </motion.div>
      ))}

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }}
        style={{ paddingLeft: '6vw', paddingRight: '6vw', marginTop: '7vh', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.12em', color: 'rgba(245,245,240,0.28)', lineHeight: 1.9 }}>
          A century of radical thinking.<br />Furniture as philosophy.<br />Objects as manifestos.
        </div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(48px, 9vw, 130px)', color: '#FF4D00', lineHeight: 1, letterSpacing: '-0.04em', textAlign: 'right' }}>CENTURY</div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// QUOTE CHAPTER
// ─────────────────────────────────────────────────────────────
function QuoteChapter({ quote, index }: { quote: typeof QUOTES[0]; index: number }) {
  const palettes = [
    { bg: '#0028FF', fg: '#F5F5F0', acc: '#FF4D00' },
    { bg: '#E8FF00', fg: '#0A0A0A', acc: '#FF0022' },
    { bg: '#0A0A0A', fg: '#F5F5F0', acc: '#E8FF00' },
    { bg: '#FF4D00', fg: '#0A0A0A', acc: '#F5F5F0' },
    { bg: '#111', fg: '#F5F5F0', acc: '#0028FF' },
  ];
  const p = palettes[index % palettes.length];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.93, 1]);

  return (
    <motion.section ref={ref} style={{ scale, background: p.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10vh 6vw', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-5vw', right: '-2vw', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(140px, 32vw, 500px)', lineHeight: 1, letterSpacing: '-0.06em', color: 'transparent', WebkitTextStroke: `1px ${p.fg}10`, pointerEvents: 'none' }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.25em', color: p.acc, marginBottom: '56px' }}>
        QUOTE — {String(index + 1).padStart(2, '0')}
      </motion.div>

        {quote.text.split('\n').map((line, i) => (
          <motion.div key={i}
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.14, duration: 1, ease: [0.76, 0, 0.24, 1] }}
            style={{ display: 'block', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(30px, 6vw, 88px)', letterSpacing: '-0.04em', lineHeight: 0.93, color: p.fg }}>
            {line}
          </motion.div>
        ))}

      <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.8 }}
        style={{ marginTop: '56px', display: 'flex', alignItems: 'center', gap: '18px' }}>
        <div style={{ width: '36px', height: '1px', background: p.fg, opacity: 0.35 }} />
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.16em', color: p.fg, opacity: 0.5 }}>— {quote.author.toUpperCase()}</span>
      </motion.div>
    </motion.section>
  );
}

// ─────────────────────────────────────────────────────────────
// DESIGNERS LIST CHAPTER
// ─────────────────────────────────────────────────────────────
function MastersChapter() {
  const navigate = useNavigate();
  const featured = designers.slice(0, 6);
  return (
    <section style={{ background: '#F5F5F0', color: '#0A0A0A', minHeight: '100vh', padding: '12vh 6vw' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.25em', color: 'rgba(10,10,10,0.35)', marginBottom: '10vh' }}>
        CHAPTER 02 — THE MASTERS
      </motion.div>

      {featured.map((d, i) => (
        <motion.div key={d.id}
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          whileHover={{ x: 18 }}
          onClick={() => navigate(`/designers/${d.id}`)}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid rgba(10,10,10,0.1)', padding: '26px 0', cursor: 'none' }}>
          <div style={{ display: 'flex', gap: '22px', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: 'rgba(10,10,10,0.28)', minWidth: '26px' }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(22px, 4vw, 60px)', letterSpacing: '-0.03em', lineHeight: 1 }}>{d.name}</span>
          </div>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: 'rgba(10,10,10,0.38)' }}>{d.years}</span>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', background: d.color, color: d.accent, padding: '4px 10px' }}>{d.nationality.substring(0, 3).toUpperCase()}</span>
            <span style={{ color: '#FF4D00', fontSize: '16px' }}>→</span>
          </div>
        </motion.div>
      ))}
      <div style={{ borderTop: '1px solid rgba(10,10,10,0.1)' }} />

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }}
        style={{ marginTop: '8vh', display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(56px, 11vw, 170px)', letterSpacing: '-0.05em', lineHeight: 0.85, color: '#0A0A0A', textAlign: 'right' }}>
          MASTERS<br /><span style={{ color: '#FF4D00' }}>OF</span><br />FORM
        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// IMMERSIVE VOID CHAPTER
// ─────────────────────────────────────────────────────────────
function VoidChapter() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} style={{ background: '#0A0A0A', minHeight: '130vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div style={{ position: 'absolute', inset: 0, y }}>
        <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
          <defs>
            <radialGradient id="vg1" cx="28%" cy="40%"><stop offset="0%" stopColor="#FF4D00" stopOpacity="0.28" /><stop offset="100%" stopColor="#0A0A0A" stopOpacity="0" /></radialGradient>
            <radialGradient id="vg2" cx="78%" cy="58%"><stop offset="0%" stopColor="#0028FF" stopOpacity="0.35" /><stop offset="100%" stopColor="#0A0A0A" stopOpacity="0" /></radialGradient>
            <radialGradient id="vg3" cx="50%" cy="80%"><stop offset="0%" stopColor="#E8FF00" stopOpacity="0.12" /><stop offset="100%" stopColor="#0A0A0A" stopOpacity="0" /></radialGradient>
          </defs>
          <rect width="1200" height="800" fill="#0A0A0A" />
          <rect width="1200" height="800" fill="url(#vg1)" />
          <rect width="1200" height="800" fill="url(#vg2)" />
          <rect width="1200" height="800" fill="url(#vg3)" />
          <rect x="200" y="140" width="1" height="520" fill="rgba(245,245,240,0.04)" />
          <rect x="600" y="60" width="1" height="680" fill="rgba(245,245,240,0.03)" />
          <rect x="1000" y="180" width="1" height="440" fill="rgba(245,245,240,0.04)" />
          <circle cx="300" cy="350" r="220" fill="none" stroke="rgba(245,245,240,0.03)" strokeWidth="1" />
          <circle cx="900" cy="400" r="290" fill="none" stroke="rgba(245,245,240,0.025)" strokeWidth="1" />
        </svg>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
        style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 6vw' }}>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(60px, 17vw, 240px)', lineHeight: 0.84, letterSpacing: '-0.06em', color: '#F5F5F0' }}>
          PURE<br /><span style={{ color: '#FF4D00' }}>FORM</span>
        </div>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.9 }}
          style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', letterSpacing: '0.1em', color: 'rgba(245,245,240,0.35)', marginTop: '48px', lineHeight: 1.9 }}>
          When function is perfected,<br />beauty becomes inevitable.
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// OBJECTS COLLECTION CHAPTER
// ─────────────────────────────────────────────────────────────
function CollectionChapter() {
  const navigate = useNavigate();
  const featured = artifacts.slice(0, 7);
  const offsets = ['-4vw', '10vw', '-2vw', '14vw', '0', '8vw', '-6vw'];
  const sizes = ['clamp(26px,5vw,70px)', 'clamp(36px,6.5vw,88px)', 'clamp(22px,4vw,54px)', 'clamp(32px,5.5vw,76px)', 'clamp(28px,5vw,68px)', 'clamp(38px,7vw,96px)', 'clamp(24px,4.5vw,60px)'];

  return (
    <section style={{ background: '#0A0A0A', padding: '14vh 6vw' }}>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.25em', color: 'rgba(245,245,240,0.28)', marginBottom: '10vh' }}>
        CHAPTER 03 — THE COLLECTION
      </motion.div>
      {featured.map((artifact, i) => (
        <motion.div key={artifact.id}
          initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: i * 0.09, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          onClick={() => navigate(`/objects/${artifact.id}`)}
          style={{ display: 'flex', alignItems: 'center', gap: '3vw', marginBottom: '5vh', marginLeft: offsets[i], cursor: 'none' }}>
          <div style={{ width: '16px', height: '16px', background: artifact.color, borderRadius: '50%', flexShrink: 0 }} />
          <div>
            <motion.div whileHover={{ x: 12 }}
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: sizes[i], letterSpacing: '-0.04em', lineHeight: 0.88, color: '#F5F5F0' }}>
              {artifact.name}
            </motion.div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', color: artifact.color, marginTop: '8px' }}>
              {artifact.designer} — {artifact.year}
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// MANIFESTO CHAPTER
// ─────────────────────────────────────────────────────────────
function ManifestoChapter() {
  const lines = [
    { text: 'DESIGN', color: '#F5F5F0', align: 'left', size: 'clamp(68px, 17vw, 260px)', stroke: undefined },
    { text: 'IS NOT', color: '#FF4D00', align: 'center', size: 'clamp(50px, 13vw, 196px)', stroke: undefined },
    { text: 'DECORATION.', color: '#E8FF00', align: 'right', size: 'clamp(36px, 10vw, 148px)', stroke: undefined },
    { text: 'IT IS', color: 'transparent', align: 'left', size: 'clamp(58px, 14vw, 210px)', stroke: '1px rgba(245,245,240,0.22)' },
    { text: 'THOUGHT.', color: '#0028FF', align: 'center', size: 'clamp(76px, 18vw, 270px)', stroke: undefined },
  ];
  return (
    <section style={{ background: '#0A0A0A', minHeight: '115vh', padding: '14vh 6vw', overflow: 'hidden' }}>
      {lines.map((line, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.11, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: line.size, lineHeight: 0.87, letterSpacing: '-0.05em', color: line.color, WebkitTextStroke: line.stroke, textAlign: line.align as any, display: 'block', marginBottom: '2vh' }}>
          {line.text}
        </motion.div>
      ))}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// MOVEMENT IMAGE STRIP (homepage chapter)
// ─────────────────────────────────────────────────────────────
function MovementStrip() {
  const navigate = useNavigate();
  const featured = [
    { id: 'bauhaus', label: 'Bauhaus', period: '1919–1933' },
    { id: 'mid-century-modern', label: 'Mid-Century', period: '1945–1969' },
    { id: 'scandinavian-modern', label: 'Scandinavian', period: '1930–1970' },
    { id: 'italian-radical-design', label: 'Italian Radical', period: '1960–1985' },
    { id: 'memphis-milano', label: 'Memphis', period: '1981–1988' },
  ];

  return (
    <section style={{ background: '#0A0A0A', padding: '14vh 0 0' }}>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.25em', color: 'rgba(245,245,240,0.28)', marginBottom: '6vh', paddingLeft: '6vw' }}>
        CHAPTER 05 — MOVEMENTS
      </motion.div>
      <div style={{ display: 'flex', overflowX: 'auto', gap: '2px', paddingBottom: '0' }}>
        {featured.map((m, i) => (
          <MovementCard key={m.id} id={m.id} label={m.label} period={m.period} index={i} onClick={() => navigate(`/movements/${m.id}`)} />
        ))}
      </div>
    </section>
  );
}

function MovementCard({ id, label, period, index, onClick }: { id: string; label: string; period: string; index: number; onClick: () => void }) {
  const img = useMovementImageHook(id);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.7 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ flexShrink: 0, width: '280px', height: '380px', position: 'relative', overflow: 'hidden', cursor: 'none' }}
    >
      <MuseumImageComponent image={img} aspect="3/4" fit="cover" accentColor="#FF4D00" style={{ width: '100%', height: '100%' }} />
      <motion.div
        animate={{ opacity: hovered ? 1 : 0.7 }}
        style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 60%, transparent 100%)' }}
      />
      <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.2vw, 26px)', letterSpacing: '-0.03em', color: '#F5F5F0', lineHeight: 1, marginBottom: '6px' }}>{label}</div>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(245,245,240,0.45)' }}>{period}</div>
      </div>
      <motion.div animate={{ opacity: hovered ? 1 : 0 }} style={{ position: 'absolute', top: '20px', right: '20px', color: '#FF4D00', fontSize: '20px' }}>→</motion.div>
    </motion.div>
  );
}
function ArchiveNav() {
  const navigate = useNavigate();
  const sections = [
    { label: 'OBJECTS', sub: `${artifacts.length} iconic artifacts`, path: '/objects', color: '#FF4D00', bg: '#0A0A0A' },
    { label: 'DESIGNERS', sub: `${designers.length} masters of form`, path: '/designers', color: '#0028FF', bg: '#F5F5F0' },
    { label: 'MOVEMENTS', sub: '9 eras of design history', path: '/movements', color: '#0A0A0A', bg: '#E8FF00' },
    { label: 'TIMELINE', sub: 'From 1860 to now', path: '/timeline', color: '#F5F5F0', bg: '#111' },
    { label: 'MATERIALS', sub: '8 essential materials', path: '/materials', color: '#F5F5F0', bg: '#6A6A6A' },
    { label: 'PROCESS', sub: `${techniques.length} manufacturing techniques`, path: '/manufacturing', color: '#FF4D00', bg: '#1a1a1a' },
    { label: 'SEARCH', sub: 'Find anything in the archive', path: '/search', color: '#0A0A0A', bg: '#FF4D00' },
  ];

  return (
    <section style={{ background: '#0A0A0A', padding: '14vh 6vw' }}>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.25em', color: 'rgba(245,245,240,0.28)', marginBottom: '8vh' }}>
        CHAPTER 04 — THE ARCHIVE
      </motion.div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2px' }}>
        {sections.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.7 }}
            onClick={() => navigate(s.path)}
            whileHover={{ scale: 1.03 }}
            style={{ background: s.bg, padding: '44px 32px', cursor: 'none', minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.18em', color: `${s.color}60` }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(24px, 4vw, 52px)', letterSpacing: '-0.04em', color: s.color, lineHeight: 1, marginBottom: '10px' }}>{s.label}</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.1em', color: `${s.color}55` }}>{s.sub}</div>
            </div>
            <div style={{ color: s.color, fontSize: '20px', opacity: 0.6 }}>→</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FOOTER CHAPTER
// ─────────────────────────────────────────────────────────────
function FooterChapter() {
  const navigate = useNavigate();
  return (
    <section style={{ background: '#FF4D00', minHeight: '60vh', padding: '12vh 6vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(46px, 11vw, 160px)', letterSpacing: '-0.05em', lineHeight: 0.85, color: '#0A0A0A' }}>
          EXPLORE<br />THE <span style={{ color: '#F5F5F0' }}>ARCHIVE</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.8 }}
          style={{ marginTop: '40px' }}>
          <motion.div whileHover={{ scale: 1.04 }} onClick={() => navigate('/objects')}
            style={{ background: '#0A0A0A', color: '#F5F5F0', padding: '18px 40px', fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '0.15em', display: 'inline-block', cursor: 'none' }}>
            ENTER EXHIBITION →
          </motion.div>
        </motion.div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '10vh' }}>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(10,10,10,0.45)', lineHeight: 1.8 }}>
          © FORM & IDEA — {new Date().getFullYear()}<br />DIGITAL EXHIBITION OF INDUSTRIAL DESIGN
        </div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(30px, 7vw, 100px)', letterSpacing: '-0.04em', color: '#0A0A0A', opacity: 0.12, lineHeight: 1 }}>F&I</div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <>
      <HeroChapter />
      <MarqueeChapter />
      <CenturyChapter />
      <QuoteChapter quote={QUOTES[0]} index={0} />
      <MastersChapter />
      <QuoteChapter quote={QUOTES[1]} index={1} />
      <VoidChapter />
      <CollectionChapter />
      <ManifestoChapter />
      <MovementStrip />
      <QuoteChapter quote={QUOTES[2]} index={2} />
      <ArchiveNav />
      <QuoteChapter quote={QUOTES[3]} index={3} />
      <QuoteChapter quote={QUOTES[4]} index={4} />
      <FooterChapter />
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// LAYOUT (wraps all pages)
// ─────────────────────────────────────────────────────────────
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <div style={{ background: '#0A0A0A' }}>
      <div className="noise-overlay" />
      <Cursor />
      <Nav />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => setLoading(false), []);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.07, smoothWheel: true });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    const id = requestAnimationFrame(raf);
    return () => { lenis.destroy(); cancelAnimationFrame(id); };
  }, []);

  // Scroll to top on route change handled by ScrollToTop component

  return (
    <BrowserRouter>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleComplete} />}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <Layout>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/objects" element={<ObjectsIndex />} />
              <Route path="/objects/:id" element={<ArtifactPage />} />
              <Route path="/designers" element={<DesignersIndex />} />
              <Route path="/designers/:id" element={<DesignerPage />} />
              <Route path="/movements" element={<MovementsIndex />} />
              <Route path="/movements/:id" element={<MovementPage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/materials" element={<MaterialsIndex />} />
              <Route path="/materials/:id" element={<MaterialPage />} />
              <Route path="/manufacturing" element={<ManufacturingIndex />} />
              <Route path="/manufacturing/:id" element={<TechniquePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="*" element={
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(80px, 20vw, 280px)', letterSpacing: '-0.06em', color: '#FF4D00', lineHeight: 1 }}>404</div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '0.2em', color: 'rgba(245,245,240,0.4)' }}>PAGE NOT FOUND</div>
                </div>
              } />
            </Routes>
          </Layout>
        </motion.div>
      )}
    </BrowserRouter>
  );
}
