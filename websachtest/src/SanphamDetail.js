import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LazyImage from './ui/LazyImage';
import { useCart } from './state/CartProvider';
import { useToast } from './state/ToastProvider';
import { productsById } from './data/products';
import ProductGallery from './components/ProductGallery';
import { formatVND, clamp } from './utils/format';
import { useSeo } from './hooks/useSeo';

export default function SanphamDetail() {
  const { id } = useParams();
  const product = productsById[id];

  const navigate = useNavigate();
  const { addItem } = useCart();
  const { pushToast } = useToast();

  useSeo({
    title: product ? `${product.name} | Web Sách Trẻ` : 'Sản phẩm | Web Sách Trẻ',
    description: product ? product.description : 'Chi tiết sản phẩm',
  });

  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 260);
    return () => window.clearTimeout(t);
  }, [id]);

  const unitPrice = product ? product.salePrice ?? product.price : 0;
  const hasDiscount = product ? Number(product.salePrice) < Number(product.price) : false;

  function onAddToCart() {
    if (!product) return;
    addItem(product.id, qty);
    pushToast(`Đã thêm "${product.name}" vào giỏ`, { type: 'success' });
  }

  function onBuyNow() {
    onAddToCart();
    navigate('/thanh-toan');
  }

  if (!product) {
    return (
      <div style={{ padding: 30 }}>
        <h1 style={{ margin: 0 }}>Không tìm thấy sản phẩm</h1>
        <button className="shopBtn shopBtn--primary" type="button" onClick={() => navigate('/san-pham')} style={{ marginTop: 16 }}>
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '26px 0 30px' }}>
      <div className="shopContainer">
        {loading ? (
          <div style={{ borderRadius: 22, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', padding: 16 }}>
            Đang tải chi tiết...
          </div>
        ) : (
          <div className="shopCheckoutGrid" style={{ gridTemplateColumns: '1fr 420px' }}>
            <div>
              <ProductGallery product={product} />
            </div>

            <div>
              <div className="shopFormCard" style={{ padding: 16 }}>
                <h1 className="shopSectionTitle" style={{ fontSize: 26 }}>{product.name}</h1>

                <div style={{ marginTop: 12 }}>
                  <div className="shopPriceRow">
                    <div className="shopPriceNow" style={{ fontSize: 22 }}>{formatVND(unitPrice)}</div>
                    {hasDiscount ? <div className="shopPriceWas">{formatVND(product.price)}</div> : null}
                  </div>
                  <div style={{ marginTop: 10, color: 'rgba(255,255,255,0.68)' }}>
                    Đánh giá: {Number(product.rating || 0).toFixed(1)} / 5
                    {product.author ? <div style={{ marginTop: 6 }}>Tác giả: {product.author}</div> : null}
                  </div>
                </div>

                <div style={{ marginTop: 14, color: 'rgba(255,255,255,0.76)', lineHeight: 1.8 }}>
                  {product.description}
                </div>

                <div style={{ marginTop: 16 }} className="shopFormRow">
                  <div className="shopFilterLabel">Chọn số lượng</div>
                  <div className="shopRangeRow" style={{ justifyContent: 'space-between' }}>
                    <input
                      className="shopQtyInput"
                      type="number"
                      min={1}
                      max={99}
                      value={qty}
                      onChange={(e) => setQty(clamp(Number(e.target.value) || 1, 1, 99))}
                      aria-label="Số lượng"
                    />
                    <span className="shopRangeValue" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      Thành tiền: {formatVND(unitPrice * qty)}
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button className="shopBtn shopBtn--primary" type="button" onClick={onAddToCart} style={{ flex: 1 }}>
                    Thêm vào giỏ
                  </button>
                  <button className="shopBtn" type="button" onClick={onBuyNow} style={{ flex: 1 }}>
                    Mua ngay
                  </button>
                </div>

                <div style={{ marginTop: 14, color: 'rgba(255,255,255,0.62)', fontSize: 13.5, lineHeight: 1.7 }}>
                  Ghi chú: Demo chỉ lưu giỏ hàng bằng `localStorage`, không có thanh toán thật.
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
                <div className="shopFormCard" style={{ padding: 14 }}>
                  <div className="shopFooterTitle">Ảnh minh họa (lazy load)</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
                    {(product.images || []).slice(0, 2).map((src) => (
                      <div key={src} style={{ height: 160, borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)' }}>
                        <LazyImage src={src} alt={product.name} width="100%" height="100%" style={{ width: '100%', height: '100%' }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

