import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { ListContextProvider } from '../../store/list-context';

import Teachers from './Teachers';

describe('Teachers page', () => {
  const setup = () => render(<Teachers />,{wrapper: ListContextProvider});

  test('Should have a title named "Våra lärare"', () => {
    setup();

    const title = screen.getByText(/Våra lärare/i);
    expect(title).toBeInTheDocument();
  })

  test('Should render a list of teachers if request is successful', async () => {

    const server = setupServer(
      rest.get('http://localhost:3010/teachers', async (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([
          {
              "id": 1,
              "firstName": "Adam",
              "lastName": "Henriksson",
              "personalIdNumber": "1975-12-11",
              "email": "adam@mail.com",
              "phoneNumber": "0799991111",
              "competencies": ["HTML", "CSS", "JavaScript", "Node.js"]
          },          
        ]))
      }),
    ) 

      server.listen();

      setup();

      const teachers = await screen.findAllByRole('listitem')

      expect(teachers).not.toHaveLength(0);
  })
});