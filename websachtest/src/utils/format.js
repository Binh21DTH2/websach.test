export function formatVND(amount) {
  try {
    return new Intl.NumberFormat('vi-VN').format(Number(amount || 0)) + 'đ';
  } catch {
    return `${Number(amount || 0)}đ`;
  }
}

export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

