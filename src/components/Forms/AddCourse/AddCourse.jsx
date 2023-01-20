import '../Forms.scss';

import { useContext, useRef, useState } from 'react';

import ListContext from '../../../store/list-context';

import Button from '../../ui/Button/Button';

const AddCourse = ({closeModal}) => {
    
    const context = useContext(ListContext);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [errorMsgs, setErrorMsgs] = useState({
      courseNumber: null,
      duration: null, 
    })


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
        !+courseNumberInput.current.value ||
        courseStartDateInput.current.value === '' ||
        courseDurationInput.current.value === '' ||
        !+courseDurationInput.current.value ||
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

    const validate = (e, inputField) => {
      if(!+e.target.value && e.target.value !== ''){
        setErrorMsgs({...errorMsgs, [inputField]: 'Måste vara ett nummer'})
      }
      else {
        setErrorMsgs({...errorMsgs, [inputField]: null})
      }      
    }
    
    return (
        <form className='form' onSubmit={onSubmitHandler} onChange={onChangeHandler}>
            <div className='form__input-wrapper'>
                <label className='form__label' htmlFor="course-title">Kursens namn:</label>
                <input className='form__text-input' id="course-title" type="text" pattern='[0-9]+' ref={courseTitleInput} />
            </div>
            <div className='form__input-wrapper'>
                <label className='form__label' htmlFor="course-number">Kursnummer:</label>
                <input className='form__text-input' id="course-number" type="text" ref={courseNumberInput} onChange={((e) => {validate(e, 'courseNumber')})} />
                <p className='form__error-msg'>{errorMsgs?.courseNumber}</p>
            </div>
            <div className='form__input-wrapper'>
                <label className='form__label' htmlFor="course-date">Kursens startdatum:</label>
                <input className='form__date-input' id='course-date' type="date" ref={courseStartDateInput} />
            </div>
            <div className='form__input-wrapper'>
                <label className='form__label' htmlFor="course-duration">Kursens längd:</label>
                <input className='form__text-input' id="course-duration" type="text" ref={courseDurationInput} onChange={((e) => {validate(e, 'duration')})}/>
                <p className='form__error-msg'>{errorMsgs?.duration}</p>
            </div>
            <div>
                <label className='form__label' htmlFor="duration-unit">Veckor/Dagar</label>
                <select className='form__select' name="duration-unit" id="duration-unit" defaultValue='' ref={courseUnitInput} >
                    <option className='form__option' disabled value=''>Veckor/Dagar</option>
                    <option className='form__option' value="weeks">Veckor</option>
                    <option className='form__option' value="days">Dagar</option>
                </select>
            </div>
            <div>
                <label className='add-course__label' htmlFor="course-description">Beskrivning:</label>
                <textarea className='add-course__text-area' id="course-description" type="text" ref={courseDescriptionInput} />
            </div>
            <Button type={buttonDisabled ? 'disabled' : 'secondary'} disabled={buttonDisabled}>lägg till</Button>
        </form>
     );
}
 
export default AddCourse;