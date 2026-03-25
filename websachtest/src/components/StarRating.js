import React, { useMemo } from 'react';

function Star({ filled }) {
  return (
    <span aria-hidden="true" style={{ color: filled ? 'rgba(255,204,102,0.98)' : 'rgba(255,255,255,0.25)' }}>
      ★
    </span>
  );
}

export default function StarRating({ rating = 0, outOf = 5 }) {
  const safe = Number(rating) || 0;
  const stars = useMemo(() => {
    const count = Math.max(1, Number(outOf) || 5);
    return Array.from({ length: count }).map((_, i) => i + 1);
  }, [outOf]);

  return (
    <span aria-label={`Đánh giá ${safe.toFixed(1)} trên ${outOf}`}>
      {stars.map((i) => (
        <Star key={i} filled={safe >= i} />
      ))}
    </span>
  );
}

