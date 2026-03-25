import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from './data/categories';
import { products } from './data/products';
import ProductCard from './components/ProductCard';
import Countdown from './ui/Countdown';
import { useCart } from './state/CartProvider';
import { useToast } from './state/ToastProvider';
import { ProductCardSkeleton } from './ui/Skeleton';
import { useSeo } from './hooks/useSeo';
import { formatVND } from './utils/format';

function BannerSvg() {
  return (
    <div className="shopBannerVisual" style={{ height: 280, display: 'grid', placeItems: 'center' }}>
      <div style={{ width: '100%', height: '100%', borderRadius: 18, border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.04)', display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: -80,
            background:
              'radial-gradient(circle at 30% 20%, rgba(124,92,255,0.35), transparent 60%), radial-gradient(circle at 75% 25%, rgba(57,208,255,0.25), transparent 55%), radial-gradient(circle at 40% 80%, rgba(46,229,157,0.18), transparent 60%)',
          }}
        />
        <div style={{ position: 'relative', textAlign: 'center', padding: 16 }}>
          <div style={{ fontWeight: 950, fontSize: 18 }}>Flash & Featured</div>
          <div style={{ marginTop: 10, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontSize: 13.5 }}>
            Thêm vào giỏ • Cập nhật realtime • Lưu qua reload
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  useSeo({ title: 'Trang chủ | Web Sách Trẻ', description: 'Homepage với banner carousel, flash sale, danh mục và sản phẩm nổi bật.' });

  const navigate = useNavigate();
  const { addItem } = useCart();
  const { pushToast } = useToast();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 520);
    return () => window.clearTimeout(t);
  }, []);

  const slides = useMemo(
    () => [
      { title: 'Săn ưu đãi mỗi ngày', desc: 'Flash sale theo giờ • Giá giảm sâu • Thêm vào giỏ chỉ 1 chạm.', tone: 'primary' },
      { title: 'Chọn đúng sách theo gu', desc: 'Lọc theo danh mục, giá và đánh giá để tìm nhanh hơn.', tone: 'alt' },
      { title: 'Giỏ hàng lưu tự động', desc: 'LocalStorage giúp bạn giữ trạng thái khi reload trình duyệt.', tone: 'primary' },
    ],
    []
  );

  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setSlideIndex((i) => (i + 1) % slides.length), 5200);
    return () => window.clearInterval(t);
  }, [slides.length]);

  const featured = useMemo(() => {
    return [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 8);
  }, []);

  const flashProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        const da = (a.price - a.salePrice) / Math.max(1, a.price);
        const db = (b.price - b.salePrice) / Math.max(1, b.price);
        return db - da;
      })
      .slice(0, 4);
  }, []);

  const [flashTargetTs] = useState(() => Date.now() + 1000 * 60 * 60 * 5 + 1000 * 60 * 23); // ~5h 23m

  function onAddToCart(productId) {
    addItem(productId, 1);
    const p = products.find((x) => x.id === productId);
    pushToast(p ? `Đã thêm "${p.name}" vào giỏ` : 'Đã thêm vào giỏ', { type: 'success' });
  }

  return (
    <div className="tc-page">
      <div className="shopContainer" style={{ padding: '26px 0 30px' }}>
        <section className="shopBanner" aria-label="Banner carousel">
          <div className="shopBannerInner">
            <div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span className="shopSectionHint" style={{ padding: '6px 10px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 999 }}>
                  Web Sách Trẻ
                </span>
                <span className="shopSectionHint" style={{ padding: '6px 10px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 999 }}>
                  {slides[slideIndex].tone === 'primary' ? 'Ưu đãi' : 'Gợi ý'}
                </span>
              </div>
              <h1 className="shopBannerTitle" style={{ marginTop: 12 }}>{slides[slideIndex].title}</h1>
              <div className="shopBannerDesc">{slides[slideIndex].desc}</div>
              <div className="shopBannerActions">
                <button className="shopBtn shopBtn--primary" type="button" onClick={() => navigate('/san-pham')}>
                  Khám phá sản phẩm
                </button>
                <button
                  className="shopBtn"
                  type="button"
                  onClick={() => {
                    const next = (slideIndex + 1) % slides.length;
                    setSlideIndex(next);
                  }}
                >
                  Xem nội dung khác
                </button>
              </div>
            </div>
            <div>
              <BannerSvg />
              <div style={{ marginTop: 12, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button
                  className="shopBtn"
                  type="button"
                  onClick={() => setSlideIndex((i) => (i - 1 + slides.length) % slides.length)}
                  aria-label="Trước"
                  style={{ width: 44, height: 44, padding: 0 }}
                >
                  ‹
                </button>
                <button
                  className="shopBtn"
                  type="button"
                  onClick={() => setSlideIndex((i) => (i + 1) % slides.length)}
                  aria-label="Sau"
                  style={{ width: 44, height: 44, padding: 0 }}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="shopSection" aria-label="Danh mục sản phẩm">
          <div className="shopSectionHeader">
            <div>
              <div className="shopSectionTitle">Danh mục sản phẩm</div>
              <div className="shopSectionHint" style={{ marginTop: 8 }}>
                Chọn danh mục để xem nhanh.
              </div>
            </div>
            <button className="shopBtn" type="button" onClick={() => navigate('/san-pham')} style={{ height: 44 }}>
              Xem tất cả
            </button>
          </div>

          <div className="shopCategoryGrid">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className="shopCategoryBtn"
                onClick={() => navigate(`/san-pham?category=${encodeURIComponent(c.id)}`)}
                aria-label={`Danh mục ${c.name}`}
              >
                <div className="shopCategoryIcon">{c.iconText}</div>
                <div className="shopCategoryName">{c.name}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="shopSection" aria-label="Sản phẩm nổi bật">
          <div className="shopSectionHeader">
            <div>
              <div className="shopSectionTitle">Sản phẩm nổi bật</div>
              <div className="shopSectionHint" style={{ marginTop: 8 }}>Được đánh giá cao nhất.</div>
            </div>
            <button className="shopBtn" type="button" onClick={() => navigate('/san-pham')} style={{ height: 44 }}>
              Xem thêm
            </button>
          </div>

          {loading ? (
            <div className="shopProductGrid">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="shopProductGrid">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
              ))}
            </div>
          )}
        </section>

        <section className="shopSection" aria-label="Flash sale">
          <div className="shopSectionHeader">
            <div>
              <div className="shopSectionTitle">Flash sale</div>
              <div className="shopSectionHint" style={{ marginTop: 8 }}>
                Giảm giá theo thời gian. Kết thúc sau:
              </div>
            </div>
            <Countdown targetTs={flashTargetTs} className="shopCountdown" />
          </div>

          {loading ? (
            <div className="shopProductGrid" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="shopProductGrid">
              {flashProducts.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
              ))}
            </div>
          )}
        </section>

        <section className="shopSection" aria-label="Grid sản phẩm">
          <div className="shopSectionHeader">
            <div>
              <div className="shopSectionTitle">Tất cả sản phẩm</div>
              <div className="shopSectionHint" style={{ marginTop: 8 }}>
                Lọc theo danh mục và giá ở trang danh sách.
              </div>
            </div>
            <div className="shopSectionHint">
              Từ {formatVND(Math.min(...products.map((p) => p.salePrice ?? p.price)))} đến {formatVND(Math.max(...products.map((p) => p.salePrice ?? p.price)))}
            </div>
          </div>

          {loading ? (
            <div className="shopProductGrid">
              {Array.from({ length: 12 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="shopProductGrid">
              {products.slice(0, 12).map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

