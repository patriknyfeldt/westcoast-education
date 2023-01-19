
import '../List.scss'
import { Link } from 'react-router-dom';

import Button from '../../../ui/Button/Button';


const TeachersList = ({teachers}) => {

    return (
            <ul className='list'>
            {teachers.map((teacher) => (
                <li className='list__item' key={teacher.id}>
                    <div className='list__text-wrapper'>
                        <span className='list__label'>Namn: </span>
                        <span className='list__text'>{teacher.firstName} {teacher.lastName}</span>
                    </div>
                    <div className='list__text-wrapper'>
                        <span className='list__label'>Personnummer: </span>
                        <span className='list__text'>{teacher.personalIdNumber}</span>
                    </div>
                    <div className='list__text-wrapper'>
                        <span className='list__label'>E-post: </span>
                        <span className='list__text'>{teacher.email}</span>
                    </div>
                    <div className='list__text-wrapper'>
                        <span className='list__label'>Mobilnummer: </span>
                        <span className='list__text'>{teacher.phoneNumber}</span>
                    </div>
                    <Link className='list__link' to={`/teachers/${teacher.id}`} >
                        <Button>Läs mer</Button>
                    </Link>
                </li>
            ))}
            </ul>  
    )
    
}
 
export default TeachersList;