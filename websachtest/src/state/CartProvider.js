import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { clearCartStorage, loadCartQuantities, saveCartQuantities } from '../utils/cartStorage';
import { productsById } from '../data/products';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [quantitiesById, setQuantitiesById] = useState(() => (typeof window !== 'undefined' ? loadCartQuantities() : {}));

  useEffect(() => {
    saveCartQuantities(quantitiesById);
  }, [quantitiesById]);

  const totalQuantity = useMemo(() => {
    return Object.values(quantitiesById).reduce((sum, qty) => sum + (Number(qty) || 0), 0);
  }, [quantitiesById]);

  const cartItems = useMemo(() => {
    return Object.entries(quantitiesById)
      .map(([id, quantity]) => {
        const product = productsById[id];
        if (!product) return null;
        return { product, quantity: Number(quantity) || 0, productId: id };
      })
      .filter(Boolean);
  }, [quantitiesById]);

  const addItem = useCallback((productId, quantity = 1) => {
    const qty = Math.max(1, Number(quantity) || 1);
    setQuantitiesById((prev) => {
      const next = { ...prev };
      next[productId] = (next[productId] || 0) + qty;
      return next;
    });
  }, []);

  const setQuantity = useCallback((productId, quantity) => {
    const qty = Math.max(0, Number(quantity) || 0);
    setQuantitiesById((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[productId];
      else next[productId] = qty;
      return next;
    });
  }, []);

  const removeItem = useCallback((productId) => {
    setQuantitiesById((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    clearCartStorage();
    setQuantitiesById({});
  }, []);

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, { product, quantity }) => sum + (product.salePrice || product.price) * quantity, 0);
    return { subtotal, total: subtotal };
  }, [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      totalQuantity,
      totals,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    }),
    [addItem, cartItems, clearCart, removeItem, setQuantity, totalQuantity, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

