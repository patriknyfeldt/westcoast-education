import { render, screen, logRoles } from '@testing-library/react';

import TeachersList from './TeachersList';
import Teachers from '../../pages/Teachers/Teachers';

describe('TeachersList component', () => {

    const teachers = [
        {
            id: 4,
            firstName: "William",
            lastName: "Danielsson",
            personalIdNumber: "1989-05-11",
            email: "wiliam@mail.com",
            phoneNumber: "0723445566",
            competencies: ["HTML", "CSS", "JavaScript", "Vue.js"]  
        }
    ]

  const setup = () => render(<TeachersList teachers={teachers}/>)
  
  test('Should include teachers name ', () => {
    setup();

    const name = screen.getByText(`${teachers[0].firstName} ${teachers[0].lastName}`);
    expect(name).toBeInTheDocument();
  })

  test('Should include teachers personal id number ', () => {
    setup();

    const personalIdNumber = screen.getByText(`${teachers[0].personalIdNumber}`);
    expect(personalIdNumber).toBeInTheDocument();
  })

  test('Should include teachers email address ', () => {
    setup();

    const email = screen.getByText(`${teachers[0].email}`);
    expect(email).toBeInTheDocument();
  })

  test('Should include teachers phone number ', () => {
    setup();

    const phoneNumber = screen.getByText(`${teachers[0].phoneNumber}`);
    expect(phoneNumber).toBeInTheDocument();
  })




});