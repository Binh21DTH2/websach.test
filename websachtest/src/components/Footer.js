import React from 'react';
import { Link } from 'react-router-dom';

function SocialIcon({ kind, label }) {
  return (
    <button type="button" className="shopSocialIcon" aria-label={label} onClick={(e) => e.preventDefault()}>
      {kind}
    </button>
  );
}

export default function Footer() {
  return (
    <footer className="shopFooter" aria-label="Chân trang">
      <div className="shopContainer shopFooterGrid">
        <div>
          <div className="shopFooterTitle">Thông tin liên hệ</div>
          <div className="shopFooterText">
            Địa chỉ: 123 Đường Demo, Quận 1, TP. Hồ Chí Minh
            <br />
            Hotline: 0909 123 456
            <br />
            Email: support@websachtrẻ.vn
          </div>
        </div>

        <div>
          <div className="shopFooterTitle">Chính sách</div>
          <Link className="shopFooterLink" to="/lien-he">
            Chính sách đổi trả
          </Link>
          <Link className="shopFooterLink" to="/lien-he">
            Hướng dẫn mua hàng
          </Link>
          <Link className="shopFooterLink" to="/lien-he">
            Bảo mật thông tin
          </Link>
        </div>

        <div>
          <div className="shopFooterTitle">Mạng xã hội</div>
          <div className="shopFooterText">Kết nối với chúng tôi để nhận ưu đãi mới.</div>
          <div className="shopSocialRow">
            <SocialIcon
              kind={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M14 9h3V6h-3c-1.657 0-3 1.343-3 3v3H8v3h3v7h3v-7h3l1-3h-4V9c0-.552.448-1 1-1Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              }
              label="Facebook"
            />
            <SocialIcon
              kind={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M7 7c1.1-1.1 2.7-1.8 4.5-1.8C15.6 5.2 19 8.1 19 12c0 4-3.4 6.8-7.5 6.8C7.4 18.8 4 16 4 12c0-1.6.6-3 1.6-4.1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path d="M9 12l2 2 4-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              }
              label="Zalo"
            />
            <SocialIcon
              kind={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M10 15l5-3-5-3v6Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12c0-2.3-.2-4.1-.5-5.2-.3-1.1-1.1-1.9-2.2-2.2C17.2 4.2 15.3 4 13 4H11c-2.3 0-4.2.2-5.3.6-1.1.3-1.9 1.1-2.2 2.2C3.2 8 3 9.8 3 12s.2 4 .5 5.2c.3 1.1 1.1 1.9 2.2 2.2 1.1.4 3 .6 5.3.6h2c2.3 0 4.2-.2 5.3-.6 1.1-.3 1.9-1.1 2.2-2.2.3-1.2.5-3 .5-5.2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              label="YouTube"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

