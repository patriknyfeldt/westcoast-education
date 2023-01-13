import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from './Header';

describe('Header component', () => {

const setup = () => render(<Header />, {wrapper: MemoryRouter});

  test('Should have a title named "Westcoast Education"', () => {
    setup();

    const title = screen.getByRole('heading', {
        name: 'Westcoast Education'
    });

    expect(title).toBeInTheDocument();
  })
});