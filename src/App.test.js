import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('Routing', () => {
  const setup = () => render(<App />);

  test('Navigation and rendering correct component', async () => {
    setup();

    expect(screen.getByText(/Våra utbildningar/i)).toBeInTheDocument();

    await userEvent.click(screen.getAllByText('Lärare')[0]);
    expect(screen.getByText(/Våra lärare/i)).toBeInTheDocument();

    await userEvent.click(screen.getAllByText('Kurser')[0]);
    expect(screen.getByText(/Våra kurser/i)).toBeInTheDocument();

  });
});
