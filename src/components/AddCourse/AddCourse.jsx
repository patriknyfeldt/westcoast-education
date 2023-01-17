import './AddCourse.scss'

import { useContext, useRef, useState } from 'react';

import ListContext from '../../store/list-context';

const AddCourse = ({closeModal}) => {
    
    const context = useContext(ListContext);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const courseTitleInput = useRef();
    const courseNumberInput = useRef();
    const courseDurationInput = useRef();
    const courseUnitInput = useRef();
    const courseDescriptionInput = useRef();
    const courseStartDateInput = useRef();
    
    const clearForm = () => {
        courseTitleInput.current.value = '';
        courseNumberInput.current.value = '';
        courseStartDateInput.current.value = '';
        courseDurationInput.current.value = '';
        courseUnitInput.current.value = '';
        courseDescriptionInput.current.value = '';
    }

    const onChangeHandler = () => {
      if( 
        courseTitleInput.current.value === '' ||
        courseNumberInput.current.value === '' ||
        courseStartDateInput.current.value === '' ||
        courseDurationInput.current.value === '' ||
        courseUnitInput.current.value === '' ||
        courseDescriptionInput.current.value === ''
      ) {
        setButtonDisabled(true);
      }
      else {
        setButtonDisabled(false);
      }
    }

    const onSubmitHandler = (e) => {

      e.preventDefault();

      const course = {
        title: courseTitleInput.current.value,
        courseNumber: courseNumberInput.current.value,
        startDate: courseStartDateInput.current.value,
        duration: courseDurationInput.current.value,
        unit: courseUnitInput.current.value,
        description:courseDescriptionInput.current.value,
      };
      addCourse(course);
      clearForm();
      closeModal();
    };    
  
    const addCourse = async (course) => {
      try{
        const response = await fetch('http://localhost:3010/courses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(course),
          });
      
          if (response.status === 201) {
            context.getData('courses');
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
                <label htmlFor="course-title">Kursens namn:</label>
                <input id="course-title" type="text" ref={courseTitleInput} />
            </div>
            <div>
                <label htmlFor="course-number">Kursnummer:</label>
                <input id="course-number" type="number" ref={courseNumberInput} />
            </div>
            <div>
                <label htmlFor="course-date">Kursens startdatum:</label>
                <input id='course-date' type="date" ref={courseStartDateInput} />
            </div>
            <div>
                <label htmlFor="course-duration">Kursens längd:</label>
                <input id="course-duration" type="number" ref={courseDurationInput} />
            </div>
            <div>
                <label htmlFor="duration-unit">Veckor/Dagar</label>
                <select name="duration-unit" id="duration-unit" defaultValue='' ref={courseUnitInput} >
                    <option disabled value=''>Veckor/Dagar</option>
                    <option value="weeks">Veckor</option>
                    <option value="days">Dagar</option>
                </select>
            </div>
            <div>
                <label htmlFor="course-description">Beskrivning:</label>
                <textarea id="course-description" type="text" ref={courseDescriptionInput} />
            </div>
            <button type='submit' disabled={buttonDisabled}>lägg till</button>
            <button onClick={onCancelClickedHandler}>avbryt</button>
        </form>
     );
}
 
export default AddCourse;