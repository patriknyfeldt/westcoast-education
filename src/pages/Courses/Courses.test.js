import { render, screen } from '@testing-library/react';
import Courses from './Courses';

describe('Courses page', () => {
  const setup = () => render(<Courses />);

  test('Should have a title named "Våra kurser"', () => {
    setup();

    const title = screen.getByText(/Våra kurser/i);
    expect(title).toBeInTheDocument();
  })
});