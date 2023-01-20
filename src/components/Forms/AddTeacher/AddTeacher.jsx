import '../Forms.scss';

import { useContext, useRef, useState} from 'react';

import { BiCheck } from "react-icons/bi";

import ListContext from '../../../store/list-context';

import Button from '../../ui/Button/Button';

const AddTeacher = ({closeModal}) => {
    
    const initialCompetencies = [
        {
            name: 'HTML',
            checked: false
        },
        {
            name: 'CSS',
            checked: false
        },
        {
            name: 'JavaScript',
            checked: false
        },
        {
            name: 'React',
            checked: false
        },
        {
            name: 'Angular',
            checked: false
        },
        {
            name: 'Vue.js',
            checked: false
        },
        {
            name: 'Node.js',
            checked: false
        }
        ]
        
    const context = useContext(ListContext);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [competencies, setCompetencies] = useState(initialCompetencies);
    const [errorMsgs, setErrorMsgs] = useState({
        email: null,
        phoneNumber: null, 
      })
  

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
        setCompetencies(initialCompetencies);
    }

    const onChangeHandler = () => {
        checkIfValues();
    }

    const onCheckBoxChangeHandler = (name) => {
        const updatedCompetencies = [...competencies].map((competence) => {
            if(name === competence.name){
                competence.checked = !competence.checked
            }
            return competence
        })
        setCompetencies(updatedCompetencies);
    }

    const checkIfValues = () => {
        if( 
            teacherFirstnameInput.current.value === ''||
            teacherLastnameInput.current.value === ''||
            teacherPersonalIdInput.current.value === ''||
            teacherEmailInput.current.value === ''||
            !teacherEmailInput.current.value.includes('@') ||
            teacherPhoneNumberInput.current.value === ''||
            !+teacherPhoneNumberInput.current.value ||
            !competencies.find(competence => competence.checked)
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
        lastName: teacherLastnameInput.current.value,
        personalIdNumber: teacherPersonalIdInput.current.value,
        email: teacherEmailInput.current.value,
        phoneNumber: teacherPhoneNumberInput.current.value,
        competencies: competencies
        .filter(competence => competence.checked)
        .map(competence => competence.name)
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

    const validate = (e, inputField) => {
        if( inputField === 'phoneNumber'){

            if(!+e.target.value && e.target.value !== ''){
            setErrorMsgs({...errorMsgs, phoneNumber: 'Måste vara ett nummer'})
            }

            else {
                setErrorMsgs({...errorMsgs, phoneNumber: null})
            }      
        }

        if(inputField === 'email'){

            if(!e.target.value.includes('@') && e.target.value !== '') {
                setErrorMsgs({...errorMsgs, email: 'Måste innehålla "@"'})
            }

            else {
              setErrorMsgs({...errorMsgs, email: null})
            }      
        }
      }

    return ( 
        <form className='form' onSubmit={onSubmitHandler} onChange={onChangeHandler}>
            <div className='form__input-wrapper'>
                <label className='form__label' htmlFor="teacher-first-name">Förnamn:</label>
                <input className='form__text-input' id="teacher-first-name" type="text" ref={teacherFirstnameInput} />
            </div>
            <div className='form__input-wrapper'>
                <label className='form__label' htmlFor="teacher-last-name">Efternamn:</label>
                <input className='form__text-input' id="teacher-last-name" type="text" ref={teacherLastnameInput} />
            </div>
            <div className='form__input-wrapper'>
                <label className='form__label' htmlFor="teacher-personal-id-number">Personnummer:</label>
                <input className='form__date-input' id='teacher-personal-id-number' type="date" ref={teacherPersonalIdInput} />
            </div>
            <div className='form__input-wrapper'>
                <label className='form__label' htmlFor="teacher-email-input">Email:</label>
                <input className='form__text-input' id="teacher-email-input" ref={teacherEmailInput} onChange={((e) => validate(e, 'email'))} />
                <p className='form__error-msg'>{errorMsgs?.email}</p>
            </div>
            <div className='form__input-wrapper'>
                <label className='form__label' htmlFor="teacher-phone-number">Telefonnummer:</label>
                <input className='form__text-input' id="teacher-phone-number" type="text" ref={teacherPhoneNumberInput} onChange={((e) => validate(e, 'phoneNumber'))} />
                <p className='form__error-msg'>{errorMsgs?.phoneNumber}</p>
            </div>
            <div className='form__competencies-wrapper'>
                <h4 className='form__label'>Välj kompetenser:</h4>
                <ul className='form__list'>
                    {competencies.map((competence, i) => {
                        return (
                            <li className='form__list-item' key={i}>
                                <label 
                                className={
                                    `${competencies[i].checked ?
                                    'form__checkbox-label form__checkbox-label--checked' :
                                    'form__checkbox-label' 
                                }`} 
                                htmlFor={`checkbox-${i}`}>
                                    {competence.name}
                                    {competencies[i].checked && <BiCheck />}
                                </label>
                                <input
                                className='form__checkbox' 
                                type="checkbox"
                                id={`checkbox-${i}`}
                                name={competence.name}
                                value={competence.name}
                                checked={competencies[i].checked}
                                onChange={() => onCheckBoxChangeHandler(competence.name)}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
            <Button type={buttonDisabled ? 'disabled' : 'secondary'} disabled={buttonDisabled}>lägg till</Button>
        </form>
     );
}
 
export default AddTeacher;