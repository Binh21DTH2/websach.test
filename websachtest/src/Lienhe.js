import React from 'react';
import { Link } from 'react-router-dom';
import { useSeo } from './hooks/useSeo';

export default function Lienhe() {
  useSeo({ title: 'Liên hệ | Web Sách Trẻ', description: 'Thông tin liên hệ của Web Sách Trẻ.' });

  return (
    <div className="tc-page">
      <div className="shopContainer" style={{ padding: '26px 0 30px' }}>
        <h1 className="shopSectionTitle" style={{ fontSize: 26 }}>Liên hệ</h1>
        <p className="shopSectionHint" style={{ marginTop: 10 }}>
          Nếu bạn cần hỗ trợ, hãy liên hệ theo thông tin dưới đây.
        </p>

        <div className="shopTotalsCard" style={{ marginTop: 16 }}>
          <div className="shopFooterTitle">Thông tin liên hệ</div>
          <div className="shopFooterText">
            Địa chỉ: 123 Đường Demo, Quận 1, TP. Hồ Chí Minh
            <br />
            Hotline: 0909 123 456
            <br />
            Email: support@websachtrẻ.vn
          </div>

          <div style={{ marginTop: 14, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/san-pham" className="shopBtn shopBtn--primary" style={{ height: 44 }}>
              Tìm sản phẩm
            </Link>
            <Link to="/gio-hang" className="shopBtn" style={{ height: 44 }}>
              Xem giỏ hàng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

