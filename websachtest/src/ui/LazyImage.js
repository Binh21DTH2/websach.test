import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function LazyImage({
  src,
  alt,
  className,
  style,
  width,
  height,
  placeholderSrc,
  ...imgProps
}) {
  const ref = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setShouldLoad(true);
          obs.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const finalSrc = useMemo(() => (shouldLoad ? src : placeholderSrc || src), [placeholderSrc, src, shouldLoad]);

  return (
    <div ref={ref} style={{ width, height }}>
      <img src={finalSrc} alt={alt} className={className} style={style} loading="lazy" {...imgProps} />
    </div>
  );
}

