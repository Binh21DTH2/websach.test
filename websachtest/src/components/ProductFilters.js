import React from 'react';
import { formatVND } from '../utils/format';

export default function ProductFilters({
  categories,
  categoryId,
  setCategoryId,
  ratingMin,
  setRatingMin,
  priceMin,
  priceMax,
  minPossible,
  maxPossible,
  setPriceMin,
  setPriceMax,
  sortBy,
  setSortBy,
  onReset,
}) {
  const step = 5000;

  return (
    <aside className="shopFiltersCard" aria-label="Bộ lọc sản phẩm">
      <div className="shopFiltersTitle">Bộ lọc</div>

      <div className="shopFilterGroup">
        <div className="shopFilterLabel">Danh mục</div>
        <select className="shopSelect" value={categoryId || ''} onChange={(e) => setCategoryId(e.target.value || null)}>
          <option value="">Tất cả</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="shopFilterGroup">
        <div className="shopFilterLabel">Giá</div>
        <div className="shopRangeRow">
          <input
            className="shopInput"
            type="range"
            min={minPossible}
            max={maxPossible}
            step={step}
            value={priceMin}
            onChange={(e) => setPriceMin(Math.min(Number(e.target.value), priceMax))}
            aria-label="Giá thấp nhất"
          />
        </div>
        <div className="shopRangeRow">
          <span className="shopRangeValue">{formatVND(priceMin)}</span>
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>→</span>
          <span className="shopRangeValue">{formatVND(priceMax)}</span>
        </div>
        <div className="shopRangeRow">
          <input
            className="shopInput"
            type="range"
            min={minPossible}
            max={maxPossible}
            step={step}
            value={priceMax}
            onChange={(e) => setPriceMax(Math.max(Number(e.target.value), priceMin))}
            aria-label="Giá cao nhất"
          />
        </div>
      </div>

      <div className="shopFilterGroup">
        <div className="shopFilterLabel">Đánh giá (từ)</div>
        <select
          className="shopSelect"
          value={ratingMin}
          onChange={(e) => setRatingMin(Number(e.target.value))}
          aria-label="Đánh giá tối thiểu"
        >
          <option value={0}>Tất cả</option>
          {[3, 3.5, 4, 4.5].map((r) => (
            <option key={r} value={r}>
              {r} sao trở lên
            </option>
          ))}
        </select>
      </div>

      <div className="shopFilterGroup">
        <div className="shopFilterLabel">Sắp xếp</div>
        <select className="shopSelect" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Mới nhất</option>
          <option value="priceAsc">Giá tăng</option>
          <option value="priceDesc">Giá giảm</option>
        </select>
      </div>

      <div className="shopFilterGroup" style={{ marginTop: 16 }}>
        <button type="button" className="shopBtn" onClick={onReset} style={{ width: '100%' }}>
          Đặt lại bộ lọc
        </button>
      </div>
    </aside>
  );
}

