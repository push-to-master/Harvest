import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import OrgsCard from '../orgs-card'

test('Renders table with headings', () => {
  render(<Router>
    <OrgsCard/>
  </Router>);
  const tableheader = screen.getByText(/view analytics/i);
  expect(tableheader).toBeInTheDocument();
});
