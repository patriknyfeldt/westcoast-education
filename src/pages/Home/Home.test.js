import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home page', () => {
  const setup = async () => render(<Home />);

  test('Should have a title named "Våra utbildningar"', async () => {
    await setup();

    const title = screen.getByText(/Våra utbildningar/i);

      expect(title).toBeInTheDocument();
  })
});