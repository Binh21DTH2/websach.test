import React, { useMemo, useState } from 'react';
import './DanhMuc.css';

function BookMiniCard({ title, author }) {
  const initial = (title?.trim()?.[0] || '').toUpperCase();
  return (
    <article className="dmBookMini">
      <div className="dmBookMiniCover" aria-hidden="true">
        <div className="dmBookMiniInitial">{initial}</div>
      </div>
      <div className="dmBookMiniBody">
        <div className="dmBookMiniTitle">{title}</div>
        <div className="dmBookMiniAuthor">{author}</div>
      </div>
    </article>
  );
}

export default function DanhMuc() {
  const categories = useMemo(
    () => [
      'Sách tiểu thuyết',
      'Sách văn học',
      'Truyện Ngắn',
      'Trinh Thám',
      'Kinh tế - Tài chính',
      'Kỹ năng sống',
      'Tâm lý học',
      'Khởi nghiệp',
      'Văn hóa - Lịch sử',
      'Sách học nhanh',
    ],
    []
  );

  const [selected, setSelected] = useState(categories[0]);

  const shelf = useMemo(() => {
    const books = {
      'Sách tiểu thuyết': [
        { title: 'Một ngày bình yên', author: 'Thu Trang' },
        { title: 'Ký ức bờ sông', author: 'Quang Minh' },
        { title: 'Tình yêu và mùa mưa', author: 'Hạ Vy' },
        { title: 'Thành phố của những vì sao', author: 'Minh Khang' },
        { title: 'Bên kia cơn gió', author: 'Ngọc Anh' },
        { title: 'Người giữ lời', author: 'Gia Bảo' },
      ],
      'Sách văn học': [
        { title: 'Văn chương tuổi trẻ', author: 'Bảo Ngọc' },
        { title: 'Tinh hoa ngôn từ', author: 'Thanh Hà' },
        { title: 'Tác phẩm chọn lọc', author: 'Hải An' },
        { title: 'Đọc để trưởng thành', author: 'Linh Chi' },
        { title: 'Nhịp văn', author: 'Quốc Khánh' },
        { title: 'Hành trình chữ nghĩa', author: 'Trang Anh' },
      ],
      'Truyện Ngắn': [
        { title: 'Câu chuyện trước giờ ngủ', author: 'Lê Phương' },
        { title: 'Một đoạn kết mở', author: 'Tấn Phát' },
        { title: 'Thứ bảy của tôi', author: 'Ngọc Hải' },
        { title: 'Những điều nhỏ thôi', author: 'Minh Anh' },
        { title: 'Thư gửi mùa thu', author: 'Hồng Nhung' },
        { title: 'Đi qua những ngã rẽ', author: 'Trần Bảo' },
      ],
      'Trinh Thám': [
        { title: 'Vụ án đêm mưa', author: 'Mai Huyền' },
        { title: 'Mật mã trong bóng tối', author: 'Hoàng Tuấn' },
        { title: 'Dấu vết cuối cùng', author: 'Kiên Cường' },
        { title: 'Người biến mất', author: 'Bích Ngọc' },
        { title: 'Bản báo cáo đỏ', author: 'Sơn Tùng' },
        { title: 'Tội lỗi giấu trong trang', author: 'Linh Dương' },
      ],
      'Kinh tế - Tài chính': [
        { title: 'Tài chính cho người trẻ', author: 'Trần Bảo' },
        { title: 'Đầu tư thông minh', author: 'Phương Nam' },
        { title: 'Kinh tế vĩ mô dễ hiểu', author: 'Minh Khôi' },
        { title: 'Thói quen làm giàu', author: 'Vũ Linh' },
        { title: 'Quản trị tiền bạc', author: 'Hải Yến' },
        { title: 'Sổ tay dòng tiền', author: 'Ngọc Thảo' },
      ],
      'Kỹ năng sống': [
        { title: 'Tư duy dẫn dắt', author: 'Minh Anh' },
        { title: 'Làm chủ cảm xúc', author: 'Hạ Vy' },
        { title: 'Giao tiếp chạm tới tim', author: 'Quang Huy' },
        { title: 'Kỷ luật nhẹ nhàng', author: 'Trang Anh' },
        { title: 'Tập trung đúng cách', author: 'Bảo Khanh' },
        { title: 'Tư duy tăng trưởng', author: 'Thanh Hà' },
      ],
      'Tâm lý học': [
        { title: 'Đọc vị bản thân', author: 'Nhật Minh' },
        { title: 'Tâm lý trong quyết định', author: 'Kiên Cường' },
        { title: 'Cách não ghi nhớ', author: 'Ngọc Anh' },
        { title: 'Khuôn mẫu suy nghĩ', author: 'Linh Chi' },
        { title: 'Thấu hiểu người khác', author: 'Gia Bảo' },
        { title: 'Hành vi và cảm xúc', author: 'Thu Trang' },
      ],
      'Khởi nghiệp': [
        { title: 'Từ 0 đến MVP', author: 'Hải An' },
        { title: 'Chiến lược tăng trưởng', author: 'Bảo Ngọc' },
        { title: 'Xây đội ngũ', author: 'Quốc Khánh' },
        { title: 'Gọi vốn không hoảng', author: 'Minh Khang' },
        { title: 'Sản phẩm đúng người', author: 'Ngọc Hải' },
        { title: 'Doanh nghiệp nhỏ xịn', author: 'Lê Phương' },
      ],
      'Văn hóa - Lịch sử': [
        { title: 'Nhìn lại một thời', author: 'Hồng Nhung' },
        { title: 'Bản đồ văn hóa', author: 'Mai Huyền' },
        { title: 'Những trang sử quanh ta', author: 'Sơn Tùng' },
        { title: 'Phong tục và con người', author: 'Bích Ngọc' },
        { title: 'Di sản kể chuyện', author: 'Hải Yến' },
        { title: 'Lịch sử qua tư liệu', author: 'Hoàng Tuấn' },
      ],
      'Sách học nhanh': [
        { title: 'Học nhanh 30 ngày', author: 'Quang Minh' },
        { title: 'Ghi nhớ siêu tốc', author: 'Linh Dương' },
        { title: 'Tư duy học hiệu quả', author: 'Trần Bảo' },
        { title: 'Ôn thi gọn', author: 'Ngọc Thảo' },
        { title: 'Kỹ thuật trả lời nhanh', author: 'Bảo Khanh' },
        { title: 'Luyện não đúng nhịp', author: 'Vũ Linh' },
      ],
    };

    return books[selected] || [];
  }, [selected]);

  return (
    <div className="dmPage">
      <div className="dmContainer">
        <div className="dmHeader">
          <h1 className="dmTitle">Danh mục sách</h1>
          <p className="dmSub">Chọn thể loại để xem gợi ý nhanh. Dữ liệu mẫu.</p>
        </div>

        <div className="dmCategoryGrid" role="list" aria-label="Danh sách danh mục">
          {categories.map((c) => {
            const active = c === selected;
            return (
              <button
                key={c}
                type="button"
                role="listitem"
                className={`dmCatBtn ${active ? 'dmCatBtn--active' : ''}`}
                onClick={() => setSelected(c)}
              >
                {c}
              </button>
            );
          })}
        </div>

        <section className="dmShelf">
          <div className="dmShelfHeader">
            <div className="dmShelfTitle">Gợi ý trong: {selected}</div>
            <div className="dmShelfHint">Top đọc gần đây (mẫu)</div>
          </div>

          <div className="dmShelfGrid">
            {shelf.map((b) => (
              <BookMiniCard key={b.title} title={b.title} author={b.author} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

