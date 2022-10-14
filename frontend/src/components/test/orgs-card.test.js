import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import OrgsCard from '../orgs-card'

test('Renders card and checks for analytics', () => {
  render(<Router>
    <OrgsCard/>
  </Router>);
  const tableheader = screen.getByText(/view analytics/i);
  expect(tableheader).toBeInTheDocument();
});


test('Renders card and checks for logs', () => {
  render(<Router>
    <OrgsCard/>
  </Router>);
  const tableheader = screen.getByText(/logs/i);
  expect(tableheader).toBeInTheDocument();
});