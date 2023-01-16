import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { ListContextProvider } from '../../../store/list-context';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import Teacher from './Teacher';
describe('Teacher page', () => {
  
  const routes = [
    {
      path: "/teachers/:teacherId",
      element: <Teacher />,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/teachers/2"],
  });

  const setup = () => render(
  <ListContextProvider>
    <RouterProvider router={router} >
      <Teacher />
    </RouterProvider>
  </ListContextProvider>)

  test("Should render correct teacher name on right url", async () => {

        const server = setupServer(
        rest.get('http://localhost:3010/teachers', async (req, res, ctx) => {
          return res(ctx.status(200), ctx.json([
            {
                "id": 2,
                "firstName": "Eva",
                "lastName": "Svensson",
                "personalIdNumber": "1972-09-23",
                "email": "eva@mail.com",
                "phoneNumber": "0711999992",
                "competencies": ["HTML", "CSS", "JavaScript", "Angular"]          
            },          
          ]))
        }),
      ) 
  
    server.listen();

    setup()
  
    const title = await screen.findByText(/Eva Svensson/i);

    expect(title).toBeInTheDocument();
  });
})