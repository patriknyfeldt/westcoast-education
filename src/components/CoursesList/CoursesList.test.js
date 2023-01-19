import { render, screen } from '@testing-library/react';

import CoursesList from './CoursesList';

describe('CoursesList component', () => {

    const courses = [
        {
            "id": 4,
            "courseNumber": 104,
            "title": "JavaScript 4",
            "duration": 5,
            "unit": "weeks",
            "description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam commodo venenatis rhoncus. Vivamus id lacus id elit tristique vulputate. Donec ut diam vitae ligula mollis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras tempor sed elit nec pretium. In accumsan odio id est vehicula tincidunt. Aliquam tincidunt risus nec tellus auctor, eget gravida purus efficitur. Morbi rhoncus erat ac leo gravida, id varius ex rhoncus. Donec a ultricies est. Phasellus congue tincidunt vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus pretium vel odio et tincidunt.Ut dignissim mi ac elit facilisis feugiat. Etiam velit ligula, interdum id nisi sed, auctor tristique felis. Pellentesque laoreet eleifend nibh eu consequat. Aenean ex odio, interdum id purus quis, vulputate consectetur leo. Vestibulum vitae commodo mauris. Vestibulum blandit, tortor vitae aliquam euismod, urna orci condimentum quam, in dapibus urna tortor quis nibh. Maecenas tempus elit nibh, in luctus ipsum dignissim vel. Ut volutpat enim et est aliquam rhoncus.",
            "startDate": "2023-05-29"
          },      
    ]

  const setup = () => render(<CoursesList courses={courses}/>)
  
  test('Should include courses name', () => {
    setup();

    const name = screen.getByText(`${courses[0].title}`);
    expect(name).toBeInTheDocument();
  })

  test('Should include coursenumber', () => {
    setup();

    const courseNumber = screen.getByText(`${courses[0].courseNumber}`);
    expect(courseNumber).toBeInTheDocument();
  })

  test('Should include courses start date', () => {
    setup();

    const startDate = screen.getByText(`${courses[0].startDate}`);
    expect(startDate).toBeInTheDocument();
  })

  test('Should include courses duration', () => {
    setup();

    const duration = screen.getByText(`${courses[0].duration} ${courses[0].unit}`);
    expect(duration).toBeInTheDocument();
  })

});
