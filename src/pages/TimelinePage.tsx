import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { timelineEvents } from '../data/movements';
import { SectionLabel } from '../components/UI';

export default function TimelinePage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const cats = ['movement', 'object', 'moment', 'designer'];
  const catColors: Record<string, string> = { movement: '#0028FF', object: '#FF4D00', moment: '#E8FF00', designer: '#FF0022' };

  return (
    <div ref={ref} style={{ background: '#0A0A0A', minHeight: '100vh' }}>

      {/* Progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', background: 'rgba(245,245,240,0.08)', zIndex: 200 }}>
        <motion.div style={{ height: '100%', background: '#FF4D00', width: progressWidth }} />
      </div>

      {/* Header */}
      <section style={{ padding: '18vh 6vw 8vh', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-4vw', bottom: '-8vw', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(80px, 22vw, 320px)', lineHeight: 1, color: 'transparent', WebkitTextStroke: '1px rgba(245,245,240,0.04)', pointerEvents: 'none', letterSpacing: '-0.06em' }}>
          TIME
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <SectionLabel text={`TIMELINE — ${timelineEvents.length} MILESTONES`} />
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(40px, 9vw, 120px)', lineHeight: 0.88, letterSpacing: '-0.05em', color: '#F5F5F0' }}>
            A CENTURY<br /><span style={{ color: '#E8FF00' }}>OF FORM</span>
          </div>
        </motion.div>

        {/* Legend */}
        <div style={{ marginTop: '60px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {cats.map(cat => (
            <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', background: catColors[cat], borderRadius: '50%' }} />
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(245,245,240,0.4)' }}>
                {cat.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline events */}
      <section style={{ padding: '0 6vw 16vh', position: 'relative' }}>
        {/* Vertical line */}
        <div style={{ position: 'absolute', left: 'calc(6vw + 80px)', top: 0, bottom: 0, width: '1px', background: 'rgba(245,245,240,0.07)' }} />

        {timelineEvents.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', marginBottom: i < timelineEvents.length - 1 ? '60px' : '0', position: 'relative' }}
          >
            {/* Year */}
            <div style={{ minWidth: '80px', textAlign: 'right', paddingTop: '4px' }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 'clamp(11px, 1.2vw, 14px)', letterSpacing: '0.05em', color: catColors[event.category], fontWeight: 700 }}>
                {event.year}
              </div>
            </div>

            {/* Dot */}
            <div style={{ position: 'relative', paddingTop: '8px', flexShrink: 0 }}>
              <motion.div
                whileInView={{ scale: [0, 1.3, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ width: '12px', height: '12px', background: catColors[event.category], borderRadius: '50%' }}
              />
            </div>

            {/* Content */}
            <div style={{ paddingTop: '0px', flex: 1 }}>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 3vw, 40px)', letterSpacing: '-0.03em', color: '#F5F5F0', lineHeight: 1, marginBottom: '10px' }}>
                {event.event}
              </div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(13px, 1.5vw, 17px)', lineHeight: 1.6, color: 'rgba(245,245,240,0.5)', fontWeight: 300, maxWidth: '600px' }}>
                {event.description}
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Bottom CTA */}
      <section style={{ background: '#FF4D00', padding: '12vh 6vw' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 7vw, 100px)', letterSpacing: '-0.04em', lineHeight: 0.9, color: '#0A0A0A' }}>
            THE STORY<br />CONTINUES.
          </div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(10,10,10,0.5)', marginTop: '32px' }}>
            DESIGN IS NEVER FINISHED.
          </div>
        </motion.div>
      </section>
    </div>
  );
}
