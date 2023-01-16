import './AddCourse.scss'

import { useContext, useRef } from 'react';

import ListContext from '../../store/list-context';

const AddCourse = ({setShowModal}) => {
    
    const context = useContext(ListContext);

    const courseNumberInput = useRef();
    const courseTitleInput = useRef();
    const courseDurationInput = useRef();
    const courseUnitInput = useRef();
    const courseDescriptionInput = useRef();
    const courseStartDateinput = useRef();
    
    const clearForm = () => {
        courseTitleInput.current.value = '';
        courseNumberInput.current.value = '';
        courseStartDateinput.current.value = '';
        courseDurationInput.current.value = '';
        courseUnitInput.current.value = '';
        courseDescriptionInput.current.value = '';
    }

    const onSubmitHandler = (e) => {

      e.preventDefault();

      const course = {
        title: courseTitleInput.current.value,
        courseNumber: courseNumberInput.current.value,
        startDate: courseStartDateinput.current.value,
        duration: courseDurationInput.current.value,
        unit: courseUnitInput.current.value,
        description:courseDescriptionInput.current.value,
      };
      clearForm();
      addCourse(course);
    };    
  
    const addCourse = async (course) => {

        const response = await fetch('http://localhost:3010/courses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(course),
          });
      
          if (response.status === 201) {
            setShowModal(false);
            console.log(await response.json());
            context.updateList({data: [], type: 'courses'})
          }
      
    }
    
    const onCancelClickedHandler = (e) => {
      e.preventDefault();
      clearForm();
      console.log('Avbryter');
    };
    return ( 
        <form onSubmit={onSubmitHandler}>
            <div>
                <label htmlFor="course-title">Kursens namn: </label>
                <input id="course-title" type="text" ref={courseTitleInput} />
            </div>
            <div>
                <label htmlFor="course-number">Kursnummer: </label>
                <input id="course-number" type="number" ref={courseNumberInput} />
            </div>
            <div>
                <label htmlFor="course-date">Kursens startdatum:</label>
                <input type="date" ref={courseStartDateinput} />
            </div>
            <div>
                <label htmlFor="course-duration">Kursens längd: </label>
                <input id="course-duration" type="number" ref={courseDurationInput} />
            </div>
            <div>
                <select name="duration-unit" id="duration-unit" defaultValue='' ref={courseUnitInput} >
                    <option disabled value=''>Veckor/Dagar</option>
                    <option value="weeks">Veckor</option>
                    <option value="days">Dagar</option>
                </select>
            </div>
            <div>
                <label htmlFor="course-description">Beskrivning: </label>
                <textarea id="course-description" type="text" ref={courseDescriptionInput} />
            </div>
            <button>lägg till</button>
            <button onClick={onCancelClickedHandler}>avbryt</button>
        </form>
     );
}
 
export default AddCourse;