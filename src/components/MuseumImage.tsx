/**
 * MUSEUM IMAGE COMPONENT
 */
import React, { useRef, useState, useEffect, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UseImageResult, UseGalleryResult } from '../hooks/useImage';

// ─── Single image ──────────────────────────────────────────────
interface MuseumImageProps {
  image: UseImageResult;
  aspect?: string;
  fit?: 'cover' | 'contain';
  position?: string;
  showCredit?: boolean;
  style?: CSSProperties;
  imgStyle?: CSSProperties;
  accentColor?: string;
  className?: string;
  onClick?: () => void;
}

export default function MuseumImage({
  image,
  aspect = '4/3',
  fit = 'cover',
  position = 'center',
  showCredit = false,
  style,
  imgStyle,
  accentColor = '#FF4D00',
  className,
  onClick,
}: MuseumImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { rootMargin: '220px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => { setLoaded(false); }, [image.url]);

  const isLoading = image.status === 'loading';
  const showImg = inView && image.url && !isLoading;

  return (
    <div
      ref={wrapperRef}
      onClick={onClick}
      className={className}
      style={{
        position: 'relative',
        aspectRatio: aspect,
        overflow: 'hidden',
        background: '#111',
        cursor: onClick ? 'none' : undefined,
        ...style,
      }}
    >
      {/* Skeleton */}
      <AnimatePresence>
        {(!loaded || isLoading) && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'absolute', inset: 0, background: '#111' }}
          >
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
              style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(90deg, transparent 0%, ${accentColor}08 50%, transparent 100%)`,
              }}
            />
            <div style={{
              position: 'absolute', bottom: '14px', left: '14px',
              fontFamily: 'Space Mono, monospace', fontSize: '9px',
              letterSpacing: '0.18em', color: `${accentColor}25`,
            }}>
              {isLoading ? 'LOADING...' : 'NO IMAGE'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image */}
      {showImg && (
        <motion.img
          key={image.url}
          src={image.url}
          alt={image.alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: fit,
            objectPosition: position,
            display: 'block',
            ...imgStyle,
          }}
        />
      )}

      {/* Credit */}
      {showCredit && image.credit && loaded && (
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          padding: '5px 10px',
          background: 'rgba(0,0,0,0.52)',
          fontFamily: 'Space Mono, monospace', fontSize: '9px',
          letterSpacing: '0.1em', color: 'rgba(245,245,240,0.45)',
        }}>
          {image.credit}
        </div>
      )}
    </div>
  );
}

// ─── Gallery ───────────────────────────────────────────────────
interface MuseumGalleryProps {
  gallery: UseGalleryResult;
  accentColor?: string;
}

export function MuseumGallery({ gallery, accentColor = '#FF4D00' }: MuseumGalleryProps) {
  const [active, setActive] = useState(0);
  const all = [gallery.primary, ...gallery.gallery].filter(img => img.url || img.status === 'loading');

  if (all.length === 0) return null;

  const current = all[active] || gallery.primary;

  return (
    <div>
      <MuseumImage
        image={current}
        aspect="4/3"
        fit="cover"
        showCredit
        accentColor={accentColor}
        style={{ width: '100%', marginBottom: all.length > 1 ? '12px' : 0 }}
      />
      {all.length > 1 && (
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {all.map((img, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              style={{
                flexShrink: 0, width: '80px', height: '60px',
                cursor: 'none', position: 'relative', overflow: 'hidden',
                outline: i === active ? `2px solid ${accentColor}` : '2px solid transparent',
                transition: 'outline 0.2s',
              }}
            >
              <MuseumImage
                image={img}
                aspect="4/3"
                fit="cover"
                accentColor={accentColor}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
