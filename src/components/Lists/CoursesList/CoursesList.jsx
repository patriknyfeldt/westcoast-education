import '../List.scss'

import { Link } from 'react-router-dom';
import Button from '../../ui/Button/Button'
const CoursesList = ({courses}) => {

    return (
            <ul className='list'>
            {courses.map((course) => (
                <li className='list__item' key={course.id}>
                    <div className='list__text-wrapper'>
                        <span className='list__label'>Namn: </span>
                        <span className='list__text'>{course.title}</span>
                    </div>
                    <div className='list__text-wrapper'>
                        <span className='list__label'>Kursnummer: </span>
                        <span className='list__text'>{course.courseNumber}</span>
                    </div>
                    <div className='list__text-wrapper'>
                        <span className='list__label'>Startdatum: </span>
                        <span className='list__text'>{course.startDate}</span>
                    </div>
                    <div className='list__text-wrapper'>
                        <span className='list__label'>Längd: </span>
                        <span className='list__text'>{course.duration} {course.unit === 'weeks' ? 'veckor' : 'dagar'}</span>
                    </div>
                    <Link className='list__link' to={`/courses/${course.id}`} >
                        <Button>Läs mer</Button>
                    </Link>
                </li>
            ))}
            </ul>  
    )
    
}
 
export default CoursesList;