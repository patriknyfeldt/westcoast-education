import './TeachersList.scss';

const TeachersList = ({teachers}) => {

// Vi vill att listan med kurser innehåller kursnamn, kursnummer och längd på
// kursen samt startdatum. För listan av lärare behöver vi hantera förnamn, efternamn,
// personnummer, e-post samt mobilnummer.
    return (
            <ul className='teachers-list'>
            {teachers.map((teacher) => (
                <li className='teachers-list__list-item' key={teacher.id}>
                    <div>
                        <span className='teachers-list__label'>Namn: </span>
                        <span className='teachers-list__text'>{teacher.firstName} {teacher.lastName}</span>
                    </div>
                    <div>
                        <span className='teachers-list__label'>personnummer: </span>
                        <span className='teachers-list__text'>{teacher.personalIdNumber}</span>
                    </div>
                    <div>
                        <span className='teachers-list__label'>e-post: </span>
                        <span className='teachers-list__text'>{teacher.email}</span>
                    </div>
                    <div>
                        <span className='teachers-list__label'>mobilnummer: </span>
                        <span className='teachers-list__text'>{teacher.phoneNumber}</span>
                    </div>
                </li>
            ))}
            </ul>  
    )
    
}
 
export default TeachersList;