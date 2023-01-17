import './AddTeacher.scss';

import { useContext, useRef, useState } from 'react';

import ListContext from '../../store/list-context';

const AddTeacher = ({closeModal}) => {
    
    const context = useContext(ListContext);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [teacherCompetencies, setTeacherCompetencies] = useState([]);

    const teacherFirstnameInput = useRef();
    const teacherLastnameInput = useRef();
    const teacherPersonalIdInput = useRef();
    const teacherEmailInput = useRef();
    const teacherPhoneNumberInput = useRef();
    
    const clearForm = () => {
        teacherFirstnameInput.current.value = '';
        teacherLastnameInput.current.value = '';
        teacherPersonalIdInput.current.value = '';
        teacherEmailInput.current.value = '';
        teacherPhoneNumberInput.current.value = '';
    }

    const onChangeHandler = () => {
      if( 
        teacherFirstnameInput.current.value === ''||
        teacherLastnameInput.current.value === ''||
        teacherPersonalIdInput.current.value === ''||
        teacherEmailInput.current.value === ''||
        teacherPhoneNumberInput.current.value === ''
      ) {
        setButtonDisabled(true);
      }
      else {
        setButtonDisabled(false);
      }
    }

    const onSubmitHandler = (e) => {

      e.preventDefault();

      const teacher = {
        firstName: teacherFirstnameInput.current.value,
        lastname: teacherLastnameInput.current.value,
        personalIdNumber: teacherPersonalIdInput.current.value,
        email: teacherEmailInput.current.value,
        phoneNumber: teacherPhoneNumberInput.current.value,
        competencies: teacherCompetencies
      };
      addTeacher(teacher);
      clearForm();
      closeModal();
    };    
  
    const addTeacher = async (teacher) => {
      try{
        const response = await fetch('http://localhost:3010/teachers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(teacher),
          });
      
          if (response.status === 201) {
            context.getData('teachers');
          }
      }
      catch(error) {
        console.log(error);
      }
    }
    
    const onCancelClickedHandler = (e) => {
      e.preventDefault();
      clearForm();
      console.log('Avbryter');
    };

    return ( 
        <form onSubmit={onSubmitHandler} onChange={onChangeHandler}>
            <div>
                <label htmlFor="teacher-first-name">Förnamn:</label>
                <input id="teacher-first-name" type="text" ref={teacherFirstnameInput} />
            </div>
            <div>
                <label htmlFor="teacher-last-name">Efternamn:</label>
                <input id="teacher-last-name" type="text" ref={teacherLastnameInput} />
            </div>
            <div>
                <label htmlFor="teacher-personal-id-number">Personnummer</label>
                <input id='teacher-personal-id-number' type="date" ref={teacherPersonalIdInput} />
            </div>
            <div>
                <label htmlFor="teacher-email-input">Email:</label>
                <input id="teacher-email-input" type="email" ref={teacherEmailInput} />
            </div>
            <div>
                <label htmlFor="teacher-phone-number">Telefonnummer:</label>
                <input id="teacher-phone-number" type="number" ref={teacherPhoneNumberInput} />
            </div>
            
            <button type='submit' disabled={buttonDisabled}>lägg till</button>
            <button onClick={onCancelClickedHandler}>avbryt</button>
        </form>
     );
}
 
export default AddTeacher;