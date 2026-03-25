import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from './state/CartProvider';
import { useToast } from './state/ToastProvider';
import { categories as categoryList } from './data/categories';
import { products, productsById } from './data/products';
import ProductCard from './components/ProductCard';
import ProductFilters from './components/ProductFilters';
import { ProductCardSkeleton } from './ui/Skeleton';
import { clamp } from './utils/format';
import { useSeo } from './hooks/useSeo';

function sortProducts(items, sortBy) {
  const copy = [...items];
  if (sortBy === 'priceAsc') copy.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
  else if (sortBy === 'priceDesc') copy.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
  else copy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return copy;
}

export default function SanphamList() {
  useSeo({ title: 'Sản phẩm | Web Sách Trẻ', description: 'Mua sách nhanh chóng với giỏ hàng lưu bằng localStorage.' });

  const location = useLocation();
  const { addItem } = useCart();
  const { pushToast } = useToast();

  const queryFromUrl = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('q') || '';
  }, [location.search]);

  const categoryFromUrl = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('category') || '';
  }, [location.search]);

  const salePrices = useMemo(() => products.map((p) => p.salePrice ?? p.price), []);
  const minPossible = useMemo(() => Math.floor(Math.min(...salePrices) / 5000) * 5000, [salePrices]);
  const maxPossible = useMemo(() => Math.ceil(Math.max(...salePrices) / 5000) * 5000, [salePrices]);

  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(queryFromUrl);

  const [categoryId, setCategoryId] = useState(categoryFromUrl || null);
  const [ratingMin, setRatingMin] = useState(0);
  const [priceMin, setPriceMin] = useState(minPossible);
  const [priceMax, setPriceMax] = useState(maxPossible);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    setQuery(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    setCategoryId(categoryFromUrl || null);
  }, [categoryFromUrl]);

  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 380);
    return () => window.clearTimeout(t);
  }, [query, categoryId, ratingMin, priceMin, priceMax, sortBy]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const min = Math.min(priceMin, priceMax);
    const max = Math.max(priceMin, priceMax);

    const items = products.filter((p) => {
      const sale = p.salePrice ?? p.price;
      const inCategory = categoryId ? p.categoryId === categoryId : true;
      const inRating = Number(p.rating || 0) >= Number(ratingMin || 0);
      const inPrice = sale >= min && sale <= max;
      const inQuery = !q
        ? true
        : [p.name, p.author]
            .filter(Boolean)
            .some((t) => String(t).toLowerCase().includes(q));
      return inCategory && inRating && inPrice && inQuery;
    });

    return sortProducts(items, sortBy);
  }, [categoryId, priceMax, priceMin, query, ratingMin, sortBy]);

  function handleAddToCart(productId) {
    addItem(productId, 1);
    const p = productsById[productId];
    pushToast(p ? `Đã thêm "${p.name}" vào giỏ` : 'Đã thêm vào giỏ', { type: 'success' });
  }

  return (
    <div className="tc-page">
      <div className="shopContainer" style={{ padding: '26px 0 30px' }}>
        <div className="shopSectionHeader" style={{ marginBottom: 10 }}>
          <div>
            <h1 className="shopSectionTitle" style={{ fontSize: 26 }}>Sản phẩm</h1>
            <p className="shopSectionHint" style={{ marginTop: 8 }}>
              {filtered.length} kết quả
              {categoryId ? ' • ' + categoryList.find((c) => c.id === categoryId)?.name : ''}
            </p>
          </div>
          <div>
            <Link className="shopBtn" to="/gio-hang" style={{ height: 44 }}>
              Xem giỏ hàng
            </Link>
          </div>
        </div>

        <div className="shopListLayout">
          <div>
            <ProductFilters
              categories={categoryList}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              ratingMin={ratingMin}
              setRatingMin={setRatingMin}
              priceMin={priceMin}
              priceMax={priceMax}
              minPossible={minPossible}
              maxPossible={maxPossible}
              setPriceMin={(v) => setPriceMin(clamp(v, minPossible, priceMax))}
              setPriceMax={(v) => setPriceMax(clamp(v, priceMin, maxPossible))}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onReset={() => {
                setQuery(queryFromUrl);
                setCategoryId(categoryFromUrl || null);
                setRatingMin(0);
                setPriceMin(minPossible);
                setPriceMax(maxPossible);
                setSortBy('newest');
              }}
            />
          </div>

          <div>
            <div className="shopProductToolbar">
              <div className="shopToolbarSearch">
                <div className="shopSearchWrap" style={{ padding: 12 }}>
                  <input
                    className="shopSearchInput"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Tìm kiếm realtime (tên hoặc tác giả)..."
                    aria-label="Tìm kiếm realtime"
                  />
                </div>
              </div>
            </div>

            <div className="shopGridWrap">
              {loading ? (
                <div className="shopProductGrid">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ padding: 20, borderRadius: 22, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)' }}>
                  Không có sản phẩm phù hợp. Thử đổi bộ lọc hoặc từ khóa.
                </div>
              ) : (
                <div className="shopProductGrid">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginTop: 18, color: 'rgba(255,255,255,0.62)', fontSize: 13.5, lineHeight: 1.7 }}>
              Gợi ý: dùng thanh lọc để tinh chỉnh theo danh mục, khoảng giá và đánh giá.
              <span style={{ display: 'block', marginTop: 6 }}>
                Giá đang hiển thị theo giá ưu đãi.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

