import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page', () => {
  // render(<App></App>);
  const linkElement = screen.getByText(/Secured by cryptography/i);
  expect(linkElement).toBeInTheDocument();
});
