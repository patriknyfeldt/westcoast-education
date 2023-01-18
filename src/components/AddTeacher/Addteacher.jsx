import './AddTeacher.scss';

import { useContext, useRef, useState} from 'react';

import ListContext from '../../store/list-context';
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
    const [competencies, setCompetencies] = useState(initialCompetencies)

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
            teacherPhoneNumberInput.current.value === ''||
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
    
    const onCancelClickedHandler = (e) => {
      e.preventDefault();
      clearForm();
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
                <label htmlFor="teacher-personal-id-number">Personnummer:</label>
                <input id='teacher-personal-id-number' type="date" ref={teacherPersonalIdInput} />
            </div>
            <div>
                <label htmlFor="teacher-email-input">Email:</label>
                <input id="teacher-email-input" type="email" ref={teacherEmailInput} />
            </div>
            <div>
                <label htmlFor="teacher-phone-number">Telefonnummer:</label>
                <input id="teacher-phone-number" type="tel" pattern='[0-9-+]+' ref={teacherPhoneNumberInput} />
            </div>
            <div>
                {}
            </div>
            <div>
                <h4>Välj kompetenser:</h4>
                <ul>
                    {competencies.map((competence, i) => {
                        return (
                            <li key={i}>
                                <label htmlFor={`checkbox-${i}`}>{competence.name}</label>
                                <input 
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
            <button type='submit' disabled={buttonDisabled}>Lägg till</button>
            <button onClick={onCancelClickedHandler}>avbryt</button>
        </form>
     );
}
 
export default AddTeacher;