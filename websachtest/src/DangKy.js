import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

export default function DangKy() {
  return (
    <div className="authPage">
      <div className="authContainer">
        <div className="authCard">
          <h1 className="authTitle">Đăng ký</h1>
          <div className="authSub">Tạo tài khoản để đồng bộ danh sách sách bạn thích.</div>

          <form
            className="authGrid"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="authGrid">
              <div>
                <div className="authLabel">Họ tên</div>
                <input className="authInput" type="text" placeholder="Nhập họ tên" required />
              </div>
              <div>
                <div className="authLabel">Email</div>
                <input className="authInput" type="email" placeholder="name@email.com" required />
              </div>
              <div>
                <div className="authLabel">Mật khẩu</div>
                <input className="authInput" type="password" placeholder="Tạo mật khẩu" required />
              </div>
              <div>
                <div className="authLabel">Nhập lại mật khẩu</div>
                <input className="authInput" type="password" placeholder="Nhập lại mật khẩu" required />
              </div>
            </div>

            <button className="authBtn" type="submit">
              Tạo tài khoản
            </button>

            <div className="authFinePrint">
              Bằng việc tạo tài khoản, bạn đồng ý với điều khoản sử dụng (demo UI).
            </div>

            <div className="authSwitch">
              <span>Đã có tài khoản?</span>
              <Link to="/dangnhap">
                <strong>Đăng nhập</strong>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

