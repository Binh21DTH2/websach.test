import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from './data/categories';
import { useSeo } from './hooks/useSeo';

export default function DanhMucPage() {
  useSeo({ title: 'Danh mục | Web Sách Trẻ', description: 'Chọn danh mục sản phẩm để lọc nhanh.' });

  const navigate = useNavigate();

  return (
    <div className="tc-page">
      <div className="shopContainer" style={{ padding: '26px 0 30px' }}>
        <div className="shopSectionHeader">
          <div>
            <h1 className="shopSectionTitle" style={{ fontSize: 26 }}>Danh mục sản phẩm</h1>
            <div className="shopSectionHint" style={{ marginTop: 8 }}>Click để xem sản phẩm theo danh mục.</div>
          </div>
          <button className="shopBtn shopBtn--primary" type="button" onClick={() => navigate('/san-pham')} style={{ height: 44 }}>
            Tới trang sản phẩm
          </button>
        </div>

        <div className="shopCategoryGrid" style={{ marginTop: 14 }}>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className="shopCategoryBtn"
              onClick={() => navigate(`/san-pham?category=${encodeURIComponent(c.id)}`)}
            >
              <div className="shopCategoryIcon">{c.iconText}</div>
              <div className="shopCategoryName">{c.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

