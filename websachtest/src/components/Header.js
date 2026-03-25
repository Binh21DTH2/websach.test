import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../state/CartProvider';

function CartSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6h15l-1.6 8.2a2 2 0 0 1-2 1.6H9.2a2 2 0 0 1-2-1.6L5 2H2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentColor" />
      <path d="M18 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentColor" />
    </svg>
  );
}

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalQuantity } = useCart();

  const qFromUrl = useMemo(() => {
    try {
      const params = new URLSearchParams(location.search);
      return params.get('q') || '';
    } catch {
      return '';
    }
  }, [location.search]);

  const [searchValue, setSearchValue] = useState(qFromUrl);
  const debounceRef = useRef(null);

  useEffect(() => {
    setSearchValue(qFromUrl);
  }, [qFromUrl]);

  const activePath = location.pathname;

  function navigateToProductSearch(nextText, { replace = true } = {}) {
    const trimmed = (nextText || '').trim();
    const params = new URLSearchParams();
    if (trimmed) params.set('q', trimmed);

    const search = params.toString();
    navigate(`/san-pham${search ? `?${search}` : ''}`, { replace });
  }

  function onChangeSearch(next) {
    setSearchValue(next);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      navigateToProductSearch(next, { replace: true });
    }, 350);
  }

  return (
    <header className="shopHeader" aria-label="Thanh điều hướng">
      <div className="shopContainer shopHeaderInner">
        <div className="shopBrand" aria-label="Logo">
          <div className="shopBrandMark" aria-hidden="true">
            S+
          </div>
          <div>
            <div className="shopBrandName">Web Sách Trẻ</div>
            <div className="shopBrandTag">Đọc nhanh - Gợi ý chuẩn gu</div>
          </div>
        </div>

        <div className="shopHeaderCenter">
          <nav className="shopMenu" aria-label="Menu">
            <Link className={`shopMenuLink ${activePath === '/' ? 'shopMenuLink--active' : ''}`} to="/">
              Trang chủ
            </Link>
            <Link
              className={`shopMenuLink ${
                activePath.startsWith('/san-pham') ? 'shopMenuLink--active' : ''
              }`}
              to="/san-pham"
            >
              Sản phẩm
            </Link>
            <Link
              className={`shopMenuLink ${activePath.startsWith('/danh-muc') ? 'shopMenuLink--active' : ''}`}
              to="/danh-muc"
            >
              Danh mục
            </Link>
            <Link
              className={`shopMenuLink ${activePath.startsWith('/lien-he') ? 'shopMenuLink--active' : ''}`}
              to="/lien-he"
            >
              Liên hệ
            </Link>
          </nav>

          <div className="shopSearchWrap" role="search" aria-label="Tìm kiếm sản phẩm">
            <input
              className="shopSearchInput"
              value={searchValue}
              onChange={(e) => onChangeSearch(e.target.value)}
              placeholder="Tìm kiếm: tên sách, tác giả..."
            />
          </div>
        </div>

        <div className="shopHeaderRightActions" aria-label="Tài khoản và giỏ hàng">
          <div className="shopAuthRow">
            <Link to="/dangnhap" className="shopAuthLink" aria-label="Đăng nhập">
              Đăng nhập
            </Link>
            <Link to="/dangky" className="shopAuthLink shopAuthLink--primary" aria-label="Đăng ký">
              Đăng ký
            </Link>
          </div>

          <Link className="shopIconBtn" to="/gio-hang" aria-label={`Giỏ hàng (${totalQuantity} sản phẩm)`}>
            <CartSvg />
            {totalQuantity > 0 ? <span className="shopCartBadge">{totalQuantity}</span> : null}
          </Link>
        </div>
      </div>
    </header>
  );
}

