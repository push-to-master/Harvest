import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('Renders home page', () => {
  render(<Router>
    <App />
  </Router>);
  const linkElement = screen.getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});
