import { screen, render } from '@testing-library/react';

import Button from './Button';

describe('Button component', (() => {
    const setup = () => render(<Button>En knapp</Button>);

    test('should render a button', (() => {
        setup();

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    }))

    test('Should have a text saying "En knapp"', (() => {
        setup();

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent(/En knapp/i);
    }))

}))
