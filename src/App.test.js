import { render, screen } from '@testing-library/react';
import App from './App';

test('renders my name and social media links', () => {
  render(<App />);
  const name = screen.getByText(/salim vazquez solis/i);
  const mail = screen.getByText(/salimvzqz@gmail.com/i);
  const website = screen.getByText(/website/i);
  const github = screen.getByText(/github/i);
  expect(name).toBeInTheDocument();
  expect(mail).toBeInTheDocument();
  expect(website).toBeInTheDocument();
  expect(github).toBeInTheDocument();
})