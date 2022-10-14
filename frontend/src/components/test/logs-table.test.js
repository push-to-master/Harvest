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
test('Renders table with Farmer', () => {
  render(<Router>
    <LogsTable/>
  </Router>);
  const tableheader = screen.getByText(/farmer/i);
  expect(tableheader).toBeInTheDocument();
});
test('Renders table with Category', () => {
  render(<Router>
    <LogsTable/>
  </Router>);
  const tableheader = screen.getByText(/category/i);
  expect(tableheader).toBeInTheDocument();
});

test('Renders table with Croptype', () => {
  render(<Router>
    <LogsTable/>
  </Router>);
  const tableheader = screen.getByText(/crop/i);
  expect(tableheader).toBeInTheDocument();
});

test('Renders table with produce type', () => {
  render(<Router>
    <LogsTable/>
  </Router>);
  const tableheader = screen.getByText(/produce/i);
  expect(tableheader).toBeInTheDocument();
});

test('Renders table with description', () => {
  render(<Router>
    <LogsTable/>
  </Router>);
  const tableheader = screen.getByText(/description/i);
  expect(tableheader).toBeInTheDocument();
});