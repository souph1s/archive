import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// ── Cursor ──────────────────────────────────────────────
export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX - 6 + 'px';
        cursorRef.current.style.top = e.clientY - 6 + 'px';
      }
      setTimeout(() => {
        if (followerRef.current) {
          followerRef.current.style.left = e.clientX - 20 + 'px';
          followerRef.current.style.top = e.clientY - 20 + 'px';
        }
      }, 80);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}

// ── Nav ──────────────────────────────────────────────────
export function Nav() {
  const navigate = useNavigate();
  const links = [
    { label: 'OBJECTS', path: '/objects' },
    { label: 'DESIGNERS', path: '/designers' },
    { label: 'MOVEMENTS', path: '/movements' },
    { label: 'TIMELINE', path: '/timeline' },
    { label: 'SEARCH', path: '/search' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
      padding: '24px 40px', display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', mixBlendMode: 'difference',
    }}>
      <span
        onClick={() => navigate('/')}
        style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.2em', color: '#F5F5F0', cursor: 'none' }}
      >
        FORM & IDEA
      </span>
      <div style={{ display: 'flex', gap: '32px' }}>
        {links.map(l => (
          <span
            key={l.label}
            onClick={() => navigate(l.path)}
            style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: '#F5F5F0', cursor: 'none', opacity: 0.7 }}
          >
            {l.label}
          </span>
        ))}
      </div>
    </nav>
  );
}

// ── Back button ──────────────────────────────────────────
export function BackBtn({ label = '← BACK', to = '/' }: { label?: string; to?: string }) {
  const navigate = useNavigate();
  return (
    <motion.div
      onClick={() => navigate(to)}
      whileHover={{ x: -4 }}
      style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(245,245,240,0.5)', cursor: 'none', display: 'inline-block' }}
    >
      {label}
    </motion.div>
  );
}

// ── Marquee ──────────────────────────────────────────────
export function Marquee({ text, bg, fg }: { text: string; bg: string; fg: string }) {
  const full = `${text} `;
  return (
    <div style={{ background: bg, padding: '24px 0', overflow: 'hidden' }}>
      <motion.div
        animate={{ x: [0, -1800] }}
        transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
        style={{ whiteSpace: 'nowrap', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(24px, 4vw, 48px)', letterSpacing: '-0.02em', color: fg }}
      >
        {full.repeat(6)}
      </motion.div>
    </div>
  );
}

// ── Section label ────────────────────────────────────────
export function SectionLabel({ text, color = 'rgba(245,245,240,0.35)' }: { text: string; color?: string }) {
  return (
    <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.28em', color, marginBottom: '8vh' }}>
      {text}
    </div>
  );
}

// ── Tag pill ─────────────────────────────────────────────
export function Tag({ children, bg = '#FF4D00', fg = '#F5F5F0' }: { children: React.ReactNode; bg?: string; fg?: string }) {
  return (
    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', background: bg, color: fg, padding: '5px 12px', borderRadius: '2px', display: 'inline-block' }}>
      {children}
    </span>
  );
}

// ── Related card ─────────────────────────────────────────
export function RelatedCard({ name, sub, onClick, color }: { name: string; sub: string; onClick: () => void; color: string }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -4 }}
      style={{ borderTop: `2px solid ${color}`, paddingTop: '20px', cursor: 'none' }}
    >
      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(14px, 2vw, 22px)', letterSpacing: '-0.02em', color: '#F5F5F0', marginBottom: '6px' }}>{name}</div>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(245,245,240,0.4)' }}>{sub}</div>
    </motion.div>
  );
}
