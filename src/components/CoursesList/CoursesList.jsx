
const CoursesList = ({courses}) => {

    return (
            <ul className='list'>
            {courses.map((course) => (
                <li className='list__list-item' key={course.id}>
                    <div>
                        <span className='list__label'>Namn: </span>
                        <span className='list__text'>{course.title}</span>
                    </div>
                    <div>
                        <span className='list__label'>kursnummer: </span>
                        <span className='list__text'>{course.courseNumber}</span>
                    </div>
                    <div>
                        <span className='list__label'>startdatum: </span>
                        <span className='list__text'>{course.startDate}</span>
                    </div>
                    <div>
                        <span className='list__label'>längd: </span>
                        <span className='list__text'>{course.duration} {course.unit}</span>
                    </div>
                </li>
            ))}
            </ul>  
    )
    
}
 
export default CoursesList;