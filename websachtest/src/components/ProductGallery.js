import React, { useMemo, useState } from 'react';
import LazyImage from '../ui/LazyImage';

export default function ProductGallery({ product }) {
  const images = useMemo(() => product.images || [], [product.images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const active = images[activeIndex] || images[0];

  const thumbs = images.slice(0, 4);

  return (
    <div>
      <div className="shopGalleryMain" style={{ borderRadius: 22, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)' }}>
        <div style={{ height: 420 }}>
          <div role="button" tabIndex={0} onClick={() => setZoomOpen(true)} onKeyDown={(e) => e.key === 'Enter' && setZoomOpen(true)} style={{ cursor: 'zoom-in' }}>
            <LazyImage src={active} alt={product.name} style={{ width: '100%', height: '100%' }} width="100%" height="100%" />
          </div>
        </div>
      </div>

      {thumbs.length > 1 ? (
        <div style={{ marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {thumbs.map((src, idx) => {
            const absoluteIndex = images.indexOf(src);
            const active = absoluteIndex === activeIndex;
            return (
              <button
                key={`${src}_${idx}`}
                type="button"
                aria-label={`Chọn ảnh ${idx + 1}`}
                onClick={() => setActiveIndex(absoluteIndex)}
                style={{
                  width: 92,
                  height: 72,
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: active ? '2px solid rgba(124,92,255,0.75)' : '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.04)',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <LazyImage src={src} alt={`${product.name} - ảnh ${idx + 1}`} width="100%" height="100%" style={{ width: '100%', height: '100%' }} />
              </button>
            );
          })}
        </div>
      ) : null}

      {zoomOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Phóng to ảnh"
          onClick={() => setZoomOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            background: 'rgba(0,0,0,0.7)',
            display: 'grid',
            placeItems: 'center',
            padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(1000px, 100%)',
              borderRadius: 22,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(7,10,18,0.8)',
              boxShadow: '0 18px 50px rgba(0,0,0,0.6)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontWeight: 950 }}>{product.name}</div>
              <button type="button" className="shopQtyBtn" onClick={() => setZoomOpen(false)} aria-label="Đóng">
                ✕
              </button>
            </div>
            <div style={{ height: '70vh' }}>
              <LazyImage src={active} alt={product.name} width="100%" height="100%" style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

