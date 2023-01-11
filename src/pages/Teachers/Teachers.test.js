import { render, screen } from '@testing-library/react';
import Teachers from './Teachers';

describe('Teachers page', () => {
  const setup = () => render(<Teachers />);

  test('Should have a title named "Våra lärare"', () => {
    setup();

    const title = screen.getByText(/Våra lärare/i);
    expect(title).toBeInTheDocument();
  })
});