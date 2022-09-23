import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import GraphsList from '../graphs-list';

test('Renders graph list with tabs', () => {
  render(<Router>
    <GraphsList/>
  </Router>);
  const tableheader = screen.getByTestId('GraphsList')
  expect(tableheader).toBeInTheDocument();
});