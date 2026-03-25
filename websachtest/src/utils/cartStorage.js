const CART_KEY = 'websach_cart_v1';

export function loadCartQuantities() {
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed;
  } catch {
    return {};
  }
}

export function saveCartQuantities(quantities) {
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(quantities || {}));
  } catch {
    // ignore write errors
  }
}

export function clearCartStorage() {
  try {
    window.localStorage.removeItem(CART_KEY);
  } catch {
    // ignore
  }
}

