import React from 'react';
import LazyImage from '../ui/LazyImage';
import { formatVND } from '../utils/format';

export default function CartLine({ item, onSetQuantity, onRemove }) {
  const { product, quantity, productId } = item;
  const unit = product.salePrice ?? product.price;

  return (
    <div className="shopCartLine">
      <div className="shopCartImgWrap">
        <LazyImage src={product.images?.[0]} alt={product.name} width="100%" height="100%" style={{ width: '100%', height: '100%' }} />
      </div>

      <div>
        <div className="shopCartName">{product.name}</div>
        <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.7)', fontSize: 13.5 }}>
          {formatVND(unit)} mỗi sản phẩm
        </div>
        <div style={{ marginTop: 10 }} className="shopQtyControls" aria-label="Điều chỉnh số lượng">
          <button
            className="shopQtyBtn"
            type="button"
            onClick={() => onSetQuantity(productId, Math.max(1, quantity - 1))}
            aria-label="Giảm số lượng"
          >
            -
          </button>
          <input
            className="shopQtyInput"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => {
              const next = Math.max(1, Number(e.target.value) || 1);
              onSetQuantity(productId, next);
            }}
            aria-label="Số lượng"
          />
          <button
            className="shopQtyBtn"
            type="button"
            onClick={() => onSetQuantity(productId, quantity + 1)}
            aria-label="Tăng số lượng"
          >
            +
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
        <div style={{ fontWeight: 950 }}>{formatVND(unit * quantity)}</div>
        <button className="shopRemoveBtn" type="button" onClick={() => onRemove(productId)} aria-label="Xóa sản phẩm">
          Xóa
        </button>
      </div>
    </div>
  );
}

