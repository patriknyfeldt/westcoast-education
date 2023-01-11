import { screen, render, logRoles } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Navbar from './Navbar';

describe('Header component', () => {

    
    
    const setup = () => render(<Navbar />, {wrapper: MemoryRouter});
    
    test('Should contain a list"', () => {
      const { container } = setup();
  
      logRoles(container);
    setup();

    const list = screen.getAllByRole('listitem');
    expect(list).not.toHaveLength(0);
  })
});