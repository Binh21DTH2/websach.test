import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './HomePage';
import SanphamList from './SanphamList';
import SanphamDetail from './SanphamDetail';
import Giohang from './Giohang';
import ThanhToan from './ThanhToan';
import DanhMucPage from './DanhMucPage';
import Lienhe from './Lienhe';
import DangNhap from './DangNhap';
import DangKy from './DangKy';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/san-pham" element={<SanphamList />} />
            <Route path="/san-pham/:id" element={<SanphamDetail />} />
            <Route path="/gio-hang" element={<Giohang />} />
            <Route path="/thanh-toan" element={<ThanhToan />} />
            <Route path="/danh-muc" element={<DanhMucPage />} />
            <Route path="/lien-he" element={<Lienhe />} />
            <Route path="/dangnhap" element={<DangNhap />} />
            <Route path="/dangky" element={<DangKy />} />
            <Route path="/dang-nhap" element={<DangNhap />} />
            <Route path="/dang-ky" element={<DangKy />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
