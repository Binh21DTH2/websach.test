import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

function NavIcon({ kind }) {
  switch (kind) {
    case 'home':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'list':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8 6h13M8 12h13M8 18h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M3.5 6h.01M3.5 12h.01M3.5 18h.01" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'login':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M10 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M19 8v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
}

export default function Layout({ children }) {
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Trang chủ', icon: 'home' },
    { to: '/danhmuc', label: 'Danh mục', icon: 'list' },
    { to: '/dangnhap', label: 'Đăng nhập', icon: 'login' },
    { to: '/dangky', label: 'Đăng ký', icon: 'signup' },
  ];

  return (
    <div className="layoutRoot">
      <aside className="layoutSidebar" aria-label="Layout điều hướng">
        <div className="layoutBrand">
          <div className="layoutBrandMark" aria-hidden="true">
            S+
          </div>
          <div className="layoutBrandText">
            <div className="layoutBrandName">Web Sách Trẻ</div>
            <div className="layoutBrandTag">Đọc nhanh - Gợi ý chuẩn gu</div>
          </div>
        </div>

        <nav className="layoutNav" aria-label="Điều hướng">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`layoutNavLink ${active ? 'layoutNavLink--active' : ''}`}
              >
                <span className="layoutNavIcon" aria-hidden="true">
                  <NavIcon kind={item.icon} />
                </span>
                <span className="layoutNavLabel">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="layoutSidebarFinePrint">Icon layout luôn hiển thị trên mọi trang.</div>
      </aside>

      <div className="layoutMain">{children}</div>
    </div>
  );
}

