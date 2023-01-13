import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Home page', () => {
  const setup = () => render(<Home />, {wrapper: MemoryRouter});

  test('Should have a title named "Våra utbildningar"', () => {
    setup();

    const title = screen.getByText(/Våra utbildningar/i);
    expect(title).toBeInTheDocument();
  })
});