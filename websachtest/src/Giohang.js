import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './state/CartProvider';
import { useToast } from './state/ToastProvider';
import CartLine from './components/CartLine';
import { formatVND } from './utils/format';
import { useSeo } from './hooks/useSeo';

export default function Giohang() {
  useSeo({ title: 'Giỏ hàng | Web Sách Trẻ', description: 'Xem và cập nhật sản phẩm trong giỏ hàng.' });

  const { cartItems, totals, setQuantity, removeItem } = useCart();
  const { pushToast } = useToast();
  const navigate = useNavigate();

  const hasItems = cartItems.length > 0;

  const lines = useMemo(() => cartItems, [cartItems]);

  function onSetQty(productId, nextQty) {
    setQuantity(productId, nextQty);
    pushToast('Cập nhật giỏ hàng thành công', { type: 'success', timeoutMs: 1600 });
  }

  function onRemove(productId) {
    removeItem(productId);
    pushToast('Đã xóa sản phẩm khỏi giỏ', { type: 'warning', timeoutMs: 1600 });
  }

  if (!hasItems) {
    return (
      <div className="tc-page">
        <div className="shopContainer" style={{ padding: '26px 0 30px' }}>
          <h1 className="shopSectionTitle" style={{ fontSize: 26 }}>Giỏ hàng trống</h1>
          <p className="shopSectionHint" style={{ marginTop: 10 }}>
            Thêm sản phẩm từ trang danh sách để xem ở đây.
          </p>
          <Link className="shopBtn shopBtn--primary" to="/san-pham" style={{ marginTop: 16 }}>
            Tìm sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="tc-page">
      <div className="shopContainer" style={{ padding: '26px 0 30px' }}>
        <div className="shopSectionHeader" style={{ marginBottom: 10 }}>
          <div>
            <h1 className="shopSectionTitle" style={{ fontSize: 26 }}>Giỏ hàng</h1>
            <div className="shopSectionHint" style={{ marginTop: 8 }}>
              Bạn đang có {cartItems.reduce((s, i) => s + i.quantity, 0)} sản phẩm
            </div>
          </div>
          <div>
            <button
              type="button"
              className="shopBtn"
              onClick={() => navigate('/san-pham')}
              style={{ height: 44 }}
            >
              Tiếp tục mua
            </button>
          </div>
        </div>

        <div className="shopCheckoutGrid">
          <div>
            <div className="shopCartList">
              {lines.map((item) => (
                <CartLine
                  key={item.productId}
                  item={item}
                  onSetQuantity={onSetQty}
                  onRemove={onRemove}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="shopTotalsCard">
              <div style={{ fontWeight: 950, marginBottom: 4 }}>Tạm tính</div>
              <div style={{ fontWeight: 950, fontSize: 22 }}>{formatVND(totals.subtotal)}</div>

              <div className="shopTotalRow">
                <div style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 900 }}>Tổng tiền</div>
                <div style={{ fontWeight: 950 }}>{formatVND(totals.total)}</div>
              </div>

              <div style={{ marginTop: 14 }}>
                <Link to="/thanh-toan" className="shopBtn shopBtn--primary" style={{ width: '100%', height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  Thanh toán
                </Link>
              </div>
              <div style={{ marginTop: 12, color: 'rgba(255,255,255,0.62)', fontSize: 13.5, lineHeight: 1.7 }}>
                Demo: chưa tính phí vận chuyển. Số tiền trong giỏ sẽ dùng luôn cho trang thanh toán.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

