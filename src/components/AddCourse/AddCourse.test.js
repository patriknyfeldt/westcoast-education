import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import AddCourse from './AddCourse';

describe('AddCourse component', () => {
    const mockCloseModal = jest.fn();
    const setup = () => render(<AddCourse closeModal={mockCloseModal}/>);

describe('Form should have:', () => {

    test('A course title input', () => {
    
        setup();  

        const courseTitleInput = screen.getByLabelText(/Kursens namn:/i);
        expect(courseTitleInput).toBeInTheDocument();
    });

    test('A course number input', () => {
    
        setup();

        const courseNumber = screen.getByLabelText(/Kursnummer:/i);
        expect(courseNumber).toBeInTheDocument();
      
    });

    test('A course start date input', () => {
    
        setup();
    
          const courseStartDateInput = screen.getByLabelText(/Kursens startdatum:/i);
          expect(courseStartDateInput).toBeInTheDocument();
          
        });
    
    test('A course duration input', () => {

        setup();
    
            const courseDuration = screen.getByLabelText(/Kursens längd:/i);
            expect(courseDuration).toBeInTheDocument();
            
        });
    
    test('A course duration unit input', () => {

        setup();
    
            const courseDurationUnitInput = screen.getByLabelText('Veckor/Dagar');
            expect(courseDurationUnitInput).toBeInTheDocument();
            
        });
        
    test('A course description input', () => {

        setup();
    
            const courseDescription = screen.getByLabelText(/Beskrivning/i);
            expect(courseDescription).toBeInTheDocument();
            
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
        const courseTitleInput = screen.getByLabelText(/Kursens namn:/i);
        const courseNumber = screen.getByLabelText(/Kursnummer:/i);
        const courseStartDateInput = screen.getByLabelText(/Kursens startdatum:/i);
        const courseDuration = screen.getByLabelText(/Kursens längd:/i);
        const courseDurationUnitInput = screen.getByLabelText('Veckor/Dagar');
        const courseDescription = screen.getByLabelText(/Beskrivning/i);
        const submitButton = screen.getByRole('button', {
            name: /Lägg till/i,
        });

        await userEvent.type(courseTitleInput, 'React');
        await userEvent.type(courseNumber, '999');
        fireEvent.change(courseStartDateInput, { target: { value: '2023-05-05', }, });
        await userEvent.type(courseDuration, '5');
        await userEvent.selectOptions(courseDurationUnitInput, 'weeks');
        await userEvent.type(courseDescription, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');

        expect(submitButton).toBeEnabled();
    });

        test('Saves the course when "Lägg till" is clicked', async () => {
        let requestBody;

        const server = setupServer(
            rest.post('http://localhost:3010/courses', (req, res, context) => {
            req.json().then((data) => (requestBody = data));
            return res(context.status(201));
            }),
        );

        server.listen();

        setup();
        const courseTitleInput = screen.getByLabelText(/Kursens namn:/i);
        const courseNumber = screen.getByLabelText(/Kursnummer:/i);
        const courseStartDateInput = screen.getByLabelText(/Kursens startdatum:/i);
        const courseDuration = screen.getByLabelText(/Kursens längd:/i);
        const courseDurationUnitInput = screen.getByLabelText('Veckor/Dagar');
        const courseDescription = screen.getByLabelText(/Beskrivning/i);
        const submitButton = screen.getByRole('button', {
            name: /Lägg till/i,
        });

        await userEvent.type(courseTitleInput, 'React');
        await userEvent.type(courseNumber, '999');
        fireEvent.change(courseStartDateInput, { target: { value: '2023-05-05', }, });
        await userEvent.type(courseDuration, '5');
        await userEvent.selectOptions(courseDurationUnitInput, 'weeks');
        await userEvent.type(courseDescription, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');

        await userEvent.click(submitButton);


        await new Promise((resolve) => setTimeout(resolve, 500));
        expect(requestBody).toEqual({
            title: 'React',
            courseNumber: '999',
            startDate: '2023-05-05',
            duration: '5',
            unit: 'weeks',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        });
    });
  });
});

