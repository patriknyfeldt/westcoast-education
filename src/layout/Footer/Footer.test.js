import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Footer from './Footer';

describe('Footer component', () => {

const setup = () => render(<Footer />, {wrapper: MemoryRouter});

test('Should contain a list of links"', () => {
  
    setup();

    const list = screen.getAllByRole('link');
    expect(list).not.toHaveLength(0);
  });
  
});