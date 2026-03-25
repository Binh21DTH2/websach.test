import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Trangchu from './Trangchu';
import DanhMuc from './DanhMuc';
import DangNhap from './DangNhap';
import DangKy from './DangKy';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Trangchu />} />
            <Route path="/danhmuc" element={<DanhMuc />} />
            <Route path="/dangnhap" element={<DangNhap />} />
            <Route path="/dangky" element={<DangKy />} />
            <Route path="*" element={<Trangchu />} />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
