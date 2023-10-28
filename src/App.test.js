import { render, screen } from '@testing-library/react';
import App from './App';
import JoyOrderDashboardTemplate from './App';

test('renders learn react link', () => {
  render(<JoyOrderDashboardTemplate />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
