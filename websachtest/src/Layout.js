import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './state/CartProvider';
import { ToastProvider } from './state/ToastProvider';
import './Trangchu.css';
import './shop/shop.css';

export default function Layout({ children }) {
  return (
    <CartProvider>
      <ToastProvider>
        <div className="tc-page shopRoot" style={{ minHeight: 0, display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Header />
          <div style={{ flex: '1 1 auto' }}>{children}</div>
          <Footer />
        </div>
      </ToastProvider>
    </CartProvider>
  );
}

