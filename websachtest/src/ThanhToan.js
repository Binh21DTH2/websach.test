import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './state/CartProvider';
import { useToast } from './state/ToastProvider';
import { formatVND } from './utils/format';
import { useSeo } from './hooks/useSeo';

export default function ThanhToan() {
  useSeo({ title: 'Thanh toán | Web Sách Trẻ', description: 'Nhập thông tin để xác nhận đơn hàng.' });

  const navigate = useNavigate();
  const { cartItems, totals, clearCart } = useCart();
  const { pushToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [orderNo, setOrderNo] = useState(null);

  const itemCount = useMemo(() => cartItems.reduce((s, i) => s + i.quantity, 0), [cartItems]);

  function validate() {
    if (!name.trim()) return 'Vui lòng nhập tên.';
    if (!phone.trim() || phone.trim().length < 9) return 'Vui lòng nhập SĐT hợp lệ.';
    if (!address.trim()) return 'Vui lòng nhập địa chỉ.';
    return null;
  }

  function onSubmit(e) {
    e.preventDefault();
    if (cartItems.length === 0) {
      pushToast('Giỏ hàng trống', { type: 'warning' });
      navigate('/san-pham');
      return;
    }

    const error = validate();
    if (error) {
      pushToast(error, { type: 'error', timeoutMs: 2600 });
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      const no = `WS-${Date.now().toString(36).toUpperCase().slice(0, 8)}`;
      setOrderNo(no);
      clearCart();
      setLoading(false);
      pushToast('Xác nhận đơn hàng thành công', { type: 'success', timeoutMs: 3200 });
    }, 700);
  }

  if (cartItems.length === 0) {
    return (
      <div className="tc-page">
        <div className="shopContainer" style={{ padding: '26px 0 30px' }}>
          <h1 className="shopSectionTitle" style={{ fontSize: 26 }}>Chưa có sản phẩm</h1>
          <p className="shopSectionHint" style={{ marginTop: 10 }}>
            Bạn hãy chọn sản phẩm trước khi thanh toán.
          </p>
          <Link className="shopBtn shopBtn--primary" to="/san-pham" style={{ marginTop: 16 }}>
            Mua ngay
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
            <h1 className="shopSectionTitle" style={{ fontSize: 26 }}>Checkout</h1>
            <div className="shopSectionHint" style={{ marginTop: 8 }}>
              {itemCount} sản phẩm • Tạm tính {formatVND(totals.subtotal)}
            </div>
          </div>
          <div>
            <button type="button" className="shopBtn" onClick={() => navigate('/gio-hang')} style={{ height: 44 }}>
              Quay lại giỏ
            </button>
          </div>
        </div>

        {orderNo ? (
          <div className="shopFormCard" style={{ padding: 18 }}>
            <div className="shopSectionTitle" style={{ fontSize: 22 }}>Cảm ơn bạn!</div>
            <div className="shopFooterText" style={{ marginTop: 10 }}>
              Mã đơn: <strong>{orderNo}</strong>
              <br />
              Phương thức:{' '}
              <strong>{paymentMethod === 'COD' ? 'COD (Thanh toán khi nhận hàng)' : 'Chuyển khoản'}</strong>
            </div>
            <div style={{ marginTop: 14 }}>
              <button className="shopBtn shopBtn--primary" type="button" onClick={() => navigate('/')} style={{ width: '100%' }}>
                Về trang chủ
              </button>
            </div>
          </div>
        ) : (
          <div className="shopCheckoutGrid">
            <form className="shopFormCard" onSubmit={onSubmit} style={{ padding: 16 }}>
              <div className="shopFiltersTitle" style={{ marginBottom: 6 }}>Thông tin nhận hàng</div>

              <div className="shopFormRow">
                <div className="shopFilterLabel">Tên</div>
                <input className="shopInput" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="shopFormRow">
                <div className="shopFilterLabel">SĐT</div>
                <input className="shopInput" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>

              <div className="shopFormRow">
                <div className="shopFilterLabel">Địa chỉ</div>
                <textarea className="shopTextarea" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>

              <div className="shopFormRow">
                <div className="shopFiltersTitle" style={{ marginTop: 10, marginBottom: 6 }}>Phương thức thanh toán</div>

                <div className="shopRadioRow" role="radiogroup" aria-label="Phương thức thanh toán">
                  <label className="shopRadioItem">
                    <input type="radio" name="pm" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
                    COD
                  </label>
                  <label className="shopRadioItem">
                    <input
                      type="radio"
                      name="pm"
                      value="TRANSFER"
                      checked={paymentMethod === 'TRANSFER'}
                      onChange={() => setPaymentMethod('TRANSFER')}
                    />
                    Chuyển khoản
                  </label>
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <button className="shopBtn shopBtn--primary" type="submit" disabled={loading} style={{ width: '100%', height: 46 }}>
                  {loading ? 'Đang xác nhận...' : 'Xác nhận đơn hàng'}
                </button>
              </div>

              <div style={{ marginTop: 10, color: 'rgba(255,255,255,0.62)', fontSize: 13.5, lineHeight: 1.7 }}>
                Demo: không gửi dữ liệu tới server. Sau khi xác nhận sẽ xóa giỏ hàng.
              </div>
            </form>

            <div className="shopTotalsCard">
              <div style={{ fontWeight: 950, marginBottom: 4 }}>Tóm tắt</div>
              <div className="shopFooterText">
                Tạm tính: <strong>{formatVND(totals.subtotal)}</strong>
                <br />
                Tổng tiền: <strong>{formatVND(totals.total)}</strong>
              </div>

              <div style={{ marginTop: 14 }}>
                <div style={{ fontWeight: 950 }}>Sản phẩm trong đơn</div>
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {cartItems.slice(0, 6).map((it) => (
                    <div key={it.productId} style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                      <div
                        style={{
                          color: 'rgba(255,255,255,0.78)',
                          fontWeight: 900,
                          maxWidth: 180,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {it.product.name}
                      </div>
                      <div style={{ fontWeight: 950 }}>x{it.quantity}</div>
                    </div>
                  ))}
                  {cartItems.length > 6 ? (
                    <div style={{ color: 'rgba(255,255,255,0.62)', fontSize: 13.5 }}>+{cartItems.length - 6} sản phẩm khác</div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

