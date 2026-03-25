import React from 'react';
import './Trangchu.css';

function BookCover({ title, tone }) {
  const initial = (title?.trim()?.[0] || '').toUpperCase();
  return (
    <div className={`tc-cover tc-cover--${tone}`} aria-hidden="true">
      <div className="tc-coverInner">
        <div className="tc-coverInitial">{initial}</div>
        <div className="tc-coverMeta">EBOOK</div>
      </div>
    </div>
  );
}

function FeaturedCard({ book }) {
  return (
    <article className="tc-bookCard">
      <button className="tc-bookCardBtn" type="button" aria-label={`Xem chi tiết: ${book.title}`}>
        <BookCover title={book.title} tone={book.tone} />
        <div className="tc-bookBody">
          <div className="tc-bookTop">
            <span className={`tc-badge tc-badge--${book.badgeTone}`}>{book.badgeText}</span>
            <span className="tc-rating" aria-label={`Đánh giá ${book.rating} trên 5`}>
              <span className="tc-ratingStar" aria-hidden="true">
                ★
              </span>
              {book.rating.toFixed(1)}
            </span>
          </div>
          <h3 className="tc-bookTitle">{book.title}</h3>
          <p className="tc-bookAuthor">{book.author}</p>
          <div className="tc-bookFooter">
            <span className="tc-bookPrice">{book.price}</span>
            <span className="tc-bookAction">Xem chi tiết</span>
          </div>
        </div>
      </button>
    </article>
  );
}

export default function Trangchu() {
  const categories = [
    { label: 'Kỹ năng sống', tone: 'a' },
    { label: 'Khởi nghiệp', tone: 'b' },
    { label: 'Tâm lý học', tone: 'c' },
    { label: 'Kinh tế - Tài chính', tone: 'd' },
    { label: 'Văn học tuổi trẻ', tone: 'e' },
    { label: 'Sách học nhanh', tone: 'f' },
  ];

  const featuredBooks = [
    {
      title: 'Tư duy dẫn dắt',
      author: 'Minh Anh',
      price: 'Miễn phí',
      badgeText: 'Hot',
      badgeTone: 'hot',
      rating: 4.8,
      tone: '1',
    },
    {
      title: 'Hành trình 21 ngày',
      author: 'Quang Huy',
      price: '59.000đ',
      badgeText: 'Mới',
      badgeTone: 'new',
      rating: 4.6,
      tone: '2',
    },
    {
      title: 'Không sợ thất bại',
      author: 'Linh Chi',
      price: 'Miễn phí',
      badgeText: 'Gợi ý',
      badgeTone: 'pick',
      rating: 4.7,
      tone: '3',
    },
    {
      title: 'Tài chính cho người trẻ',
      author: 'Trần Bảo',
      price: '99.000đ',
      badgeText: 'Top',
      badgeTone: 'top',
      rating: 4.9,
      tone: '4',
    },
    {
      title: 'Đọc vị cảm xúc',
      author: 'Nhật Minh',
      price: '79.000đ',
      badgeText: 'Đang xu hướng',
      badgeTone: 'trend',
      rating: 4.5,
      tone: '5',
    },
    {
      title: 'Sổ tay học nhanh',
      author: 'Hồng Ngọc',
      price: 'Miễn phí',
      badgeText: 'Thư viện trẻ',
      badgeTone: 'lib',
      rating: 4.4,
      tone: '6',
    },
  ];

  return (
    <div className="tc-page">
      <header className="tc-header">
        <div className="tc-container tc-headerInner">
          <div className="tc-brand" aria-label="Thương hiệu">
            <div className="tc-brandMark" aria-hidden="true">
              S+
            </div>
            <div className="tc-brandText">
              <div className="tc-brandName">Web Sách Trẻ</div>
              <div className="tc-brandTag">Đọc nhanh - Gợi ý chuẩn gu</div>
            </div>
          </div>

          <nav className="tc-nav" aria-label="Điều hướng">
            <a className="tc-navLink" href="#">
              Trang chủ
            </a>
            <a className="tc-navLink" href="#">
              Danh mục
            </a>
            <a className="tc-navLink" href="#">
              Sách nổi bật
            </a>
            <a className="tc-navLink" href="#">
              Thư viện
            </a>
          </nav>

          <div className="tc-headerRight">
            <button className="tc-iconBtn" type="button" aria-label="Tìm kiếm nhanh">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M10.5 18.5C14.6421 18.5 18 15.1421 18 11C18 6.85786 14.6421 3.5 10.5 3.5C6.35786 3.5 3 6.85786 3 11C3 15.1421 6.35786 18.5 10.5 18.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <a className="tc-userPill" href="#">
              Đăng nhập
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="tc-hero">
          <div className="tc-container tc-heroInner">
            <div className="tc-heroContent">
              <h1 className="tc-heroTitle">Khám phá sách hay mỗi ngày</h1>
              <p className="tc-heroSubtitle">
                Gợi ý nội dung theo sở thích của bạn, đọc mượt trên mọi thiết bị, và lưu lại những cuốn đáng
                đọc nhất.
              </p>

              <div className="tc-searchCard">
                <label className="tc-srOnly" htmlFor="tc-search">
                  Tìm kiếm sách
                </label>
                <input id="tc-search" className="tc-searchInput" placeholder="Nhập tên sách, tác giả..." />
                <button className="tc-searchBtn" type="button">
                  Tìm sách
                </button>
              </div>

              <div className="tc-heroActions">
                <button className="tc-btn tc-btnPrimary" type="button">
                  Bắt đầu đọc
                </button>
                <button className="tc-btn tc-btnGhost" type="button">
                  Xem top mới
                </button>
              </div>

              <div className="tc-stats">
                <div className="tc-stat">
                  <div className="tc-statNumber">1.2k+</div>
                  <div className="tc-statLabel">Sách sưu tầm</div>
                </div>
                <div className="tc-stat">
                  <div className="tc-statNumber">500k+</div>
                  <div className="tc-statLabel">Lượt đọc</div>
                </div>
                <div className="tc-stat">
                  <div className="tc-statNumber">4.8/5</div>
                  <div className="tc-statLabel">Đánh giá</div>
                </div>
              </div>
            </div>

            <div className="tc-heroVisual" aria-hidden="true">
              <div className="tc-visualCard">
                <div className="tc-visualHeader">
                  <span className="tc-chip tc-chip--glow">Đề xuất hôm nay</span>
                  <span className="tc-visualTime">Cập nhật 10 phút trước</span>
                </div>

                <div className="tc-visualList">
                  <div className="tc-visualItem">
                    <div className="tc-miniCover tc-miniCover--x" />
                    <div className="tc-visualItemBody">
                      <div className="tc-visualItemTitle">Đọc vị bản thân</div>
                      <div className="tc-visualItemMeta">Tâm lý học · 12 chương</div>
                    </div>
                    <div className="tc-visualItemTag">Free</div>
                  </div>
                  <div className="tc-visualItem">
                    <div className="tc-miniCover tc-miniCover--y" />
                    <div className="tc-visualItemBody">
                      <div className="tc-visualItemTitle">Chiến lược học nhanh</div>
                      <div className="tc-visualItemMeta">Kỹ năng · 8 module</div>
                    </div>
                    <div className="tc-visualItemTag tc-visualItemTag--buy">99k</div>
                  </div>
                  <div className="tc-visualItem">
                    <div className="tc-miniCover tc-miniCover--z" />
                    <div className="tc-visualItemBody">
                      <div className="tc-visualItemTitle">Tài chính cho người trẻ</div>
                      <div className="tc-visualItemMeta">Tài chính · 6 buổi</div>
                    </div>
                    <div className="tc-visualItemTag tc-visualItemTag--hot">Hot</div>
                  </div>
                </div>

                <div className="tc-visualFooter">
                  <a className="tc-visualLink" href="#">
                    Xem thêm gợi ý
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="tc-section">
          <div className="tc-container">
            <div className="tc-sectionHeader">
              <h2 className="tc-sectionTitle">Danh mục phù hợp với bạn</h2>
              <p className="tc-sectionHint">Chọn một chủ đề để xem bộ sưu tập.</p>
            </div>

            <div className="tc-categoryGrid">
              {categories.map((c) => (
                <button key={c.label} className={`tc-catBtn tc-catBtn--${c.tone}`} type="button">
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="tc-section tc-section--tight">
          <div className="tc-container">
            <div className="tc-sectionHeader">
              <h2 className="tc-sectionTitle">Sách nổi bật</h2>
              <p className="tc-sectionHint">Top được đọc nhiều và nhận đánh giá cao.</p>
            </div>

            <div className="tc-booksGrid">
              {featuredBooks.map((book) => (
                <FeaturedCard key={book.title} book={book} />
              ))}
            </div>
          </div>
        </section>

        <section className="tc-section">
          <div className="tc-container">
            <div className="tc-twoCol">
              <div className="tc-panel">
                <div className="tc-panelHeader">
                  <div className="tc-panelTitle">Lý do bạn sẽ thích</div>
                  <div className="tc-panelSub">Thiết kế tối ưu cho người trẻ.</div>
                </div>
                <div className="tc-featureList">
                  <div className="tc-feature">
                    <div className="tc-featureIcon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M13 2L3 14h7l-1 8 10-12h-7l1-8Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="tc-featureTitle">Đọc mượt, tìm nhanh</div>
                      <div className="tc-featureDesc">UI gọn nhẹ, thao tác 1 chạm.</div>
                    </div>
                  </div>
                  <div className="tc-feature">
                    <div className="tc-featureIcon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 2l1.2 6.2L20 9.5l-6.8 1.3L12 22l-1.2-11.2L4 9.5l6.8-1.3L12 2Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="tc-featureTitle">Gợi ý theo sở thích</div>
                      <div className="tc-featureDesc">Khám phá sách đúng gu mỗi ngày.</div>
                    </div>
                  </div>
                  <div className="tc-feature">
                    <div className="tc-featureIcon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M7 3h10a1 1 0 0 1 1 1v17l-6-3-6 3V4a1 1 0 0 1 1-1Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="tc-featureTitle">Lưu lại để đọc sau</div>
                      <div className="tc-featureDesc">Ghi chú nhanh, theo dõi tiến độ.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tc-panel tc-panel--gradient">
                <div className="tc-panelHeader">
                  <div className="tc-panelTitle">Nhận gợi ý mỗi tuần</div>
                  <div className="tc-panelSub">Không spam, chỉ nội dung đáng đọc.</div>
                </div>
                <div className="tc-newsletter">
                  <label className="tc-srOnly" htmlFor="tc-email">
                    Email
                  </label>
                  <input id="tc-email" className="tc-emailInput" placeholder="Email của bạn" />
                  <button className="tc-btn tc-btnPrimary tc-btnFull" type="button">
                    Đăng ký
                  </button>
                </div>
                <div className="tc-panelFinePrint">Bằng việc đăng ký, bạn đồng ý nhận email gợi ý.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="tc-section tc-section--tight">
          <div className="tc-container">
            <div className="tc-sectionHeader">
              <h2 className="tc-sectionTitle">Bạn đọc nói gì?</h2>
              <p className="tc-sectionHint">Một vài cảm nhận từ cộng đồng.</p>
            </div>

            <div className="tc-testimonials">
              {[
                {
                  name: 'Trang Anh',
                  role: 'Sinh viên',
                  text: 'Giao diện nhìn hiện đại, dễ tìm sách theo đúng môn mình đang học.',
                  tone: 'p1',
                },
                {
                  name: 'Quốc Khánh',
                  role: 'Nhân viên văn phòng',
                  text: 'Sách được gợi ý khá sát gu. Mình lưu lại để đọc sau rất tiện.',
                  tone: 'p2',
                },
                {
                  name: 'Khánh Vy',
                  role: 'Freelancer',
                  text: 'Top sách nổi bật giúp mình không bị “choáng” khi chọn tài liệu.',
                  tone: 'p3',
                },
              ].map((t) => (
                <div key={t.name} className={`tc-testimonial tc-testimonial--${t.tone}`}>
                  <div className="tc-quoteMark" aria-hidden="true">
                    “
                  </div>
                  <div className="tc-testimonialText">{t.text}</div>
                  <div className="tc-testimonialFooter">
                    <div className="tc-avatar" aria-hidden="true" />
                    <div>
                      <div className="tc-testimonialName">{t.name}</div>
                      <div className="tc-testimonialRole">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="tc-footer">
        <div className="tc-container tc-footerInner">
          <div className="tc-footerLeft">
            <div className="tc-footerBrand">
              <div className="tc-brandMark tc-brandMark--sm" aria-hidden="true">
                S+
              </div>
              <div>
                <div className="tc-footerName">Web Sách Trẻ</div>
                <div className="tc-footerTag">Đọc nhanh - Gợi ý chuẩn gu</div>
              </div>
            </div>
            <div className="tc-footerFine">
              © {new Date().getFullYear()} Web Sách Trẻ. Demo giao diện trang chủ.
            </div>
          </div>

          <div className="tc-footerCols">
            <div className="tc-footerCol">
              <div className="tc-footerColTitle">Trợ giúp</div>
              <a className="tc-footerLink" href="#">
                Trung tâm hỗ trợ
              </a>
              <a className="tc-footerLink" href="#">
                Quy định sử dụng
              </a>
              <a className="tc-footerLink" href="#">
                Liên hệ
              </a>
            </div>
            <div className="tc-footerCol">
              <div className="tc-footerColTitle">Khám phá</div>
              <a className="tc-footerLink" href="#">
                Danh mục
              </a>
              <a className="tc-footerLink" href="#">
                Sách nổi bật
              </a>
              <a className="tc-footerLink" href="#">
                Sách mới
              </a>
            </div>
            <div className="tc-footerCol">
              <div className="tc-footerColTitle">Kết nối</div>
              <div className="tc-footerSocialRow">
                <a className="tc-socialIcon" href="#" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M14 9h3V6h-3c-1.657 0-3 1.343-3 3v3H8v3h3v7h3v-7h3l1-3h-4V9c0-.552.448-1 1-1Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a className="tc-socialIcon" href="#" aria-label="Zalo">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M7 7c1.1-1.1 2.7-1.8 4.5-1.8C15.6 5.2 19 8.1 19 12c0 4-3.4 6.8-7.5 6.8C7.4 18.8 4 16 4 12c0-1.6.6-3 1.6-4.1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path d="M9 12l2 2 4-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </a>
                <a className="tc-socialIcon" href="#" aria-label="YouTube">
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
                </a>
              </div>
              <div className="tc-footerSmallNote">Theo dõi để cập nhật sách mới.</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

