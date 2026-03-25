import { render, screen } from '@testing-library/react';
import App from './App';

test('renders trang chu content', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /khám phá sách hay mỗi ngày/i });
  expect(heading).toBeInTheDocument();
});
