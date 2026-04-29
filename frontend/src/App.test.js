import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app component', () => {
  render(<App />);
  const heading = screen.getByText(/discover your style/i);
  expect(heading).toBeInTheDocument();
});
