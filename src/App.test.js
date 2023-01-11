import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('Routing', () => {
  const setup = () => render(<App />);

  test('navigating and rendering correct component', async () => {
    //Arrange
    setup();

    // Test if we are on startpage...
    expect(screen.getByText(/Våra utbildningar/i)).toBeInTheDocument();

    // Test if navigate to Users page/component works...
    await userEvent.click(screen.getByText('Lärare'));
    expect(screen.getByText(/Våra lärare/i)).toBeInTheDocument();

    // Test if navigate to Add users page/component works...
    await userEvent.click(screen.getByText('Kurser'));
    expect(screen.getByText(/Våra kurser/i)).toBeInTheDocument();
  });
});
