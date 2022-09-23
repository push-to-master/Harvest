import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AddLog from '../logs-add-log'

test('Renders form to add logs', () => {
  render(<Router>
    <AddLog/>
  </Router>);
  const tableheader = screen.getByText(/Submit/i);
  expect(tableheader).toBeInTheDocument();
});