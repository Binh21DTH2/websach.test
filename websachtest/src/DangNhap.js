import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

export default function DangNhap() {
  return (
    <div className="authPage">
      <div className="authContainer">
        <div className="authCard">
          <h1 className="authTitle">Đăng nhập</h1>
          <div className="authSub">Đăng nhập để lưu lại sách bạn yêu thích.</div>

          <form
            className="authGrid"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="authGrid">
              <div>
                <div className="authLabel">Email</div>
                <input className="authInput" type="email" placeholder="name@email.com" required />
              </div>
              <div>
                <div className="authLabel">Mật khẩu</div>
                <input className="authInput" type="password" placeholder="••••••••" required />
              </div>
            </div>

            <div className="authRow">
              <label className="authCheck">
                <input type="checkbox" defaultChecked />
                <span>Ghi nhớ đăng nhập</span>
              </label>
              <a className="authLink" href="#">
                Quên mật khẩu?
              </a>
            </div>

            <button className="authBtn" type="submit">
              Đăng nhập
            </button>

            <div className="authFinePrint">
              Đây là trang demo giao diện. Khi có backend, bạn nối logic đăng nhập tại đây.
            </div>

            <div className="authSwitch">
              <span>Bạn chưa có tài khoản?</span>
              <Link to="/dangky">
                <strong>Đăng ký ngay</strong>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

