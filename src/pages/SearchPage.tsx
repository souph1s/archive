import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { artifacts } from '../data/artifacts';
import { designers } from '../data/designers';
import { movements } from '../data/movements';
import { materials } from '../data/materials';
import { techniques } from '../data/manufacturing';
import { SectionLabel } from '../components/UI';

type ResultType = 'artifact' | 'designer' | 'movement' | 'material' | 'technique';

interface SearchResult {
  id: string;
  type: ResultType;
  name: string;
  sub: string;
  path: string;
  color: string;
  accent: string;
  keywords: string;
}

// Build search index once
const INDEX: SearchResult[] = [
  ...artifacts.map(a => ({
    id: a.id, type: 'artifact' as ResultType,
    name: a.name, sub: `${a.designer} — ${a.year}`,
    path: `/objects/${a.id}`, color: a.color, accent: a.accent,
    keywords: [a.name, a.designer, a.movement, a.manufacturer, a.category, ...a.materials, String(a.year)].join(' ').toLowerCase(),
  })),
  ...designers.map(d => ({
    id: d.id, type: 'designer' as ResultType,
    name: d.name, sub: `${d.nationality} — ${d.years}`,
    path: `/designers/${d.id}`, color: d.color, accent: d.accent,
    keywords: [d.name, d.nationality, ...d.movements, ...d.famousWorks].join(' ').toLowerCase(),
  })),
  ...movements.map(m => ({
    id: m.id, type: 'movement' as ResultType,
    name: m.name, sub: `${m.period} — ${m.origin}`,
    path: `/movements/${m.id}`, color: m.color, accent: m.accent,
    keywords: [m.name, m.period, m.origin, ...m.designers, ...m.objects].join(' ').toLowerCase(),
  })),
  ...materials.map(m => ({
    id: m.id, type: 'material' as ResultType,
    name: m.name, sub: m.era,
    path: `/materials/${m.id}`, color: m.color, accent: m.accent,
    keywords: [m.name, m.era, ...m.famousObjects, ...m.famousDesigners].join(' ').toLowerCase(),
  })),
  ...techniques.map(t => ({
    id: t.id, type: 'technique' as ResultType,
    name: t.name, sub: t.era,
    path: `/manufacturing/${t.id}`, color: t.color, accent: t.accent,
    keywords: [t.name, t.era, ...t.famousObjects, ...t.materials].join(' ').toLowerCase(),
  })),
];

const TYPE_LABELS: Record<ResultType, string> = {
  artifact: 'OBJECT',
  designer: 'DESIGNER',
  movement: 'MOVEMENT',
  material: 'MATERIAL',
  technique: 'PROCESS',
};

export default function SearchPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  useEffect(() => { inputRef.current?.focus(); }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return [];
    return INDEX.filter(r => r.keywords.includes(q) || r.name.toLowerCase().includes(q)).slice(0, 24);
  }, [query]);

  const grouped = useMemo(() => {
    const groups: Partial<Record<ResultType, SearchResult[]>> = {};
    results.forEach(r => {
      if (!groups[r.type]) groups[r.type] = [];
      groups[r.type]!.push(r);
    });
    return groups;
  }, [results]);

  const typeOrder: ResultType[] = ['artifact', 'designer', 'movement', 'material', 'technique'];

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', padding: '18vh 6vw 14vh' }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <SectionLabel text={`SEARCH — ${INDEX.length} ENTRIES`} />
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 7vw, 100px)', lineHeight: 0.88, letterSpacing: '-0.05em', color: '#F5F5F0', marginBottom: '8vh' }}>
          SEARCH<br /><span style={{ color: '#FF4D00' }}>THE ARCHIVE</span>
        </div>
      </motion.div>

      {/* Search input */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
        style={{ position: 'relative', marginBottom: '8vh' }}>
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="TYPE TO SEARCH..."
          style={{
            width: '100%', background: 'transparent', border: 'none',
            borderBottom: '1px solid rgba(245,245,240,0.2)',
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
            fontSize: 'clamp(24px, 5vw, 72px)', letterSpacing: '-0.04em',
            color: '#F5F5F0', padding: '0 0 24px',
            outline: 'none', cursor: 'none',
          }}
        />
        {/* Active underline */}
        <motion.div
          animate={{ scaleX: query ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: '#FF4D00', transformOrigin: 'left' }}
        />
        {/* Result count */}
        {query.length >= 2 && (
          <div style={{ position: 'absolute', right: 0, bottom: '28px', fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(245,245,240,0.3)' }}>
            {results.length} RESULTS
          </div>
        )}
      </motion.div>

      {/* Empty / initial state */}
      <AnimatePresence mode="wait">
        {query.length < 2 && (
          <motion.div key="hints" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.18em', color: 'rgba(245,245,240,0.2)', marginBottom: '32px' }}>
              TRY SEARCHING FOR:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['Eames', 'Bauhaus', 'Barcelona Chair', 'Dieter Rams', 'Plywood', 'Leather', 'Danish', 'Scandinavian'].map(hint => (
                <button key={hint} onClick={() => setQuery(hint)}
                  style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', border: '1px solid rgba(245,245,240,0.15)', background: 'transparent', color: 'rgba(245,245,240,0.55)', padding: '10px 20px', cursor: 'none' }}>
                  {hint}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {query.length >= 2 && results.length === 0 && (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 5vw, 60px)', letterSpacing: '-0.04em', color: 'rgba(245,245,240,0.1)', lineHeight: 1 }}>
              NO RESULTS<br />FOR "{query.toUpperCase()}"
            </div>
          </motion.div>
        )}

        {results.length > 0 && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {typeOrder.filter(t => grouped[t]?.length).map(type => (
              <div key={type} style={{ marginBottom: '6vh' }}>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.22em', color: 'rgba(245,245,240,0.28)', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid rgba(245,245,240,0.06)' }}>
                  {TYPE_LABELS[type]} — {grouped[type]!.length}
                </div>
                {grouped[type]!.map((r, i) => (
                  <motion.div key={r.id}
                    initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.5 }}
                    onClick={() => navigate(r.path)}
                    whileHover={{ x: 12 }}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', borderTop: '1px solid rgba(245,245,240,0.05)', cursor: 'none' }}
                  >
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <div style={{ width: '8px', height: '8px', background: r.color, borderRadius: '50%', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(16px, 2.5vw, 32px)', letterSpacing: '-0.03em', color: '#F5F5F0', lineHeight: 1 }}>
                          {/* Highlight matched text */}
                          <HighlightedText text={r.name} query={query} />
                        </div>
                        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.08em', color: 'rgba(245,245,240,0.32)', marginTop: '5px' }}>
                          {r.sub}
                        </div>
                      </div>
                    </div>
                    <span style={{ color: '#FF4D00', fontSize: '16px', opacity: 0.7 }}>→</span>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  const q = query.trim().toLowerCase();
  if (!q) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ color: '#FF4D00' }}>{text.slice(idx, idx + q.length)}</span>
      {text.slice(idx + q.length)}
    </>
  );
}
