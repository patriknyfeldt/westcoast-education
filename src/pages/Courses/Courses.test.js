import { render, screen } from '@testing-library/react';
import { ListContextProvider } from '../../store/list-context';
import { MemoryRouter } from 'react-router-dom';

import { setupServer } from 'msw/node';
import { rest } from 'msw';

import Courses from './Courses';


describe('Courses page', () => {
  const setup = () => render(
  <ListContextProvider>
    <Courses />
  </ListContextProvider>, 
  {wrapper: MemoryRouter}
  );

  test('Should have a title named "Våra kurser"', () => {
    setup();

    const title = screen.getByText(/Våra kurser/i);
    expect(title).toBeInTheDocument();
  })

  test('Should render a list of courses if request is successful', async () => {

    const server = setupServer(
      rest.get('http://localhost:3010/courses', async (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([
          {
            "id": 4,
            "courseNumber": 104,
            "title": "JavaScript 4",
            "duration": 5,
            "unit": "weeks",
            "description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam commodo venenatis rhoncus. Vivamus id lacus id elit tristique vulputate. Donec ut diam vitae ligula mollis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras tempor sed elit nec pretium. In accumsan odio id est vehicula tincidunt. Aliquam tincidunt risus nec tellus auctor, eget gravida purus efficitur. Morbi rhoncus erat ac leo gravida, id varius ex rhoncus. Donec a ultricies est. Phasellus congue tincidunt vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus pretium vel odio et tincidunt.Ut dignissim mi ac elit facilisis feugiat. Etiam velit ligula, interdum id nisi sed, auctor tristique felis. Pellentesque laoreet eleifend nibh eu consequat. Aenean ex odio, interdum id purus quis, vulputate consectetur leo. Vestibulum vitae commodo mauris. Vestibulum blandit, tortor vitae aliquam euismod, urna orci condimentum quam, in dapibus urna tortor quis nibh. Maecenas tempus elit nibh, in luctus ipsum dignissim vel. Ut volutpat enim et est aliquam rhoncus.",
            "startDate": "2023-05-29"
          }
        ]))
      }),
    ) 

      server.listen();

      setup();

      const courses = await screen.findAllByRole('listitem');

      expect(courses).not.toHaveLength(0);
  })

});