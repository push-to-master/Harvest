import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LogsTable from '../logs-table'

test('Renders table with headings', () => {
  render(<Router>
    <LogsTable/>
  </Router>);
  const tableheader = screen.getByText(/date/i);
  expect(tableheader).toBeInTheDocument();
});
