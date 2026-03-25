import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../ui/LazyImage';
import StarRating from './StarRating';
import { formatVND } from '../utils/format';

export default function ProductCard({ product, onAddToCart }) {
  const hasDiscount = Number(product.salePrice) < Number(product.price);
  const now = product.salePrice ?? product.price;

  return (
    <div className="shopProductCard">
      <Link className="shopCardLink" to={`/san-pham/${product.id}`} aria-label={`Xem chi tiết: ${product.name}`}>
        <div className="shopProductImg" style={{ height: 190 }}>
          <LazyImage
            src={product.images?.[0]}
            alt={product.name}
            width="100%"
            height="100%"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </Link>

      <div className="shopProductBody">
        <div className="shopProductTopRow">
          <div>
            {product.badge?.text ? (
              <span className="shopSectionHint" style={{ padding: '6px 10px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 999 }}>
                {product.badge.text}
              </span>
            ) : null}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <StarRating rating={product.rating} />
            <span className="shopSectionHint" style={{ margin: 0 }}>
              {Number(product.rating || 0).toFixed(1)}
            </span>
          </div>
        </div>

        <Link className="shopCardLink" to={`/san-pham/${product.id}`}>
          <h3 className="shopProductName">{product.name}</h3>
        </Link>

        <div className="shopPriceRow">
          <div className="shopPriceNow">{formatVND(now)}</div>
          {hasDiscount ? <div className="shopPriceWas">{formatVND(product.price)}</div> : null}
        </div>

        {product.description ? <div className="shopProductDesc">{product.description}</div> : null}

        <div className="shopProductFooter">
          <button
            className="shopAddBtn"
            type="button"
            onClick={() => onAddToCart?.(product.id)}
            aria-label={`Thêm vào giỏ: ${product.name}`}
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
}

