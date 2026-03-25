import React from 'react';

export function ProductCardSkeleton() {
  return (
    <div className="shopProductCard shopProductCard--skeleton" aria-hidden="true">
      <div className="shopProductImgSkeleton" />
      <div className="shopProductBodySkeleton">
        <div className="shopSkeletonLine" style={{ width: '70%' }} />
        <div className="shopSkeletonLine" style={{ width: '45%' }} />
        <div className="shopSkeletonLine" style={{ width: '85%' }} />
        <div className="shopSkeletonBtn" />
      </div>
    </div>
  );
}

export function CartLineSkeleton() {
  return (
    <div className="shopCartLine shopCartLine--skeleton" aria-hidden="true">
      <div className="shopCartImgSkeleton" />
      <div style={{ flex: 1 }}>
        <div className="shopSkeletonLine" style={{ width: '60%' }} />
        <div className="shopSkeletonLine" style={{ width: '40%', marginTop: 10 }} />
        <div className="shopSkeletonLine" style={{ width: '50%', marginTop: 10 }} />
      </div>
    </div>
  );
}

