import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import AddTeacher from './AddTeacher';

describe('AddTeacher component', () => {
    const mockCloseModal = jest.fn();
    const setup = () => render(<AddTeacher closeModal={mockCloseModal}/>);

describe('Form should have:', () => {

    test('A teacher first name input', () => {
    
        setup();  

        const teacherFirstNameInput = screen.getByLabelText(/Förnamn:/i);
        expect(teacherFirstNameInput).toBeInTheDocument();
    });

    test('A teacher last name input', () => {
    
        setup();

        const teacherLastNameInput = screen.getByLabelText(/Efternamn:/i);
        expect(teacherLastNameInput).toBeInTheDocument();
      
    });

    test('A teacher personal id input', () => {
    
        setup();

          const teacherPersonalIdInput = screen.getByLabelText(/Personnummer:/i);
          expect(teacherPersonalIdInput).toBeInTheDocument();
          
        });
    
    test('A teacher email input', () => {

        setup();

            const teacherEmailInput = screen.getByLabelText(/Email:/i);
            expect(teacherEmailInput).toBeInTheDocument();
            
        });
    
    test('A teacher phone number input', () => {

        setup();

            const teacherPhoneNumberinput = screen.getByLabelText(/Telefonnummer:/i);
            expect(teacherPhoneNumberinput).toBeInTheDocument();
            
        });
        
    test('A React checkbox input', () => {

        setup();

            const reactCheckBox = screen.getByLabelText(/React/i);
            expect(reactCheckBox).toBeInTheDocument();
            
        });
        
    test('A submit button', () => {

        setup();

        const submitButton = screen.getByRole('button', {
            name: /Lägg till/i,
        });
        
        expect(submitButton).toBeInTheDocument();

    });

    test('A submit button that is disabled initially', () => {
        setup();

        const submitButton = screen.getByRole('button', {
            name: /Lägg till/i,
        });

        expect(submitButton).toBeDisabled();
    });
});

  describe('Form interactions', () => {

    test('Submit button should be enabled when all input fields has values', async () => {

        setup();
        const teacherFirstNameInput = screen.getByLabelText(/Förnamn:/i);
        const teacherLastNameInput = screen.getByLabelText(/Efternamn:/i);
        const teacherPersonalIdInput = screen.getByLabelText(/Personnummer:/i);
        const teacherEmailInput = screen.getByLabelText(/Email:/i);
        const teacherPhoneNumberInput = screen.getByLabelText(/Telefonnummer:/i);
        const reactCheckBox = screen.getByLabelText(/React/i);
        const submitButton = screen.getByRole('button', {
            name: /Lägg till/i,
        });

        await userEvent.type(teacherFirstNameInput, 'Patrik');
        await userEvent.type(teacherLastNameInput, 'Nyfeldt');
        fireEvent.change(teacherPersonalIdInput, { target: { value: '1985-09-23', }, });
        await userEvent.type(teacherEmailInput, 'patrik@mail.com');
        await userEvent.type(teacherPhoneNumberInput, '0700000000');
        await userEvent.click(reactCheckBox);

        expect(submitButton).toBeEnabled();
    });

        test('Saves the teacher when "Lägg till" is clicked', async () => {
        let requestBody;

        const server = setupServer(
            rest.post('http://localhost:3010/teachers', (req, res, context) => {
            req.json().then((data) => (requestBody = data));
            return res(context.status(201));
            }),
        );

        server.listen();

        setup();
        const teacherFirstNameInput = screen.getByLabelText(/Förnamn:/i);
        const teacherLastNameInput = screen.getByLabelText(/Efternamn:/i);
        const teacherPersonalIdInput = screen.getByLabelText(/Personnummer:/i);
        const teacherEmailInput = screen.getByLabelText(/Email:/i);
        const teacherPhoneNumberInput = screen.getByLabelText(/Telefonnummer:/i);
        const reactCheckBox = screen.getByLabelText(/React/i);
        const submitButton = screen.getByRole('button', {
            name: /Lägg till/i,
        });

        await userEvent.type(teacherFirstNameInput, 'Patrik');
        await userEvent.type(teacherLastNameInput, 'Nyfeldt');
        fireEvent.change(teacherPersonalIdInput, { target: { value: '1985-09-23', }, });
        await userEvent.type(teacherEmailInput, 'patrik@mail.com');
        await userEvent.type(teacherPhoneNumberInput, '0700000000');
        await userEvent.click(reactCheckBox);
        await userEvent.click(submitButton);


        await new Promise((resolve) => setTimeout(resolve, 500));
        expect(requestBody).toEqual({
            firstName: 'Patrik',
            lastName: 'Nyfeldt',
            personalIdNumber: '1985-09-23',
            email: 'patrik@mail.com',
            phoneNumber: '0700000000',
            competencies: ["React"]
        });
    });
  });
});

