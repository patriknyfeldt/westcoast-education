
const TeachersList = ({teachers}) => {

    return (
            <ul className='list'>
            {teachers.map((teacher) => (
                <li className='list__list-item' key={teacher.id}>
                    <div>
                        <span className='list__label'>Namn: </span>
                        <span className='list__text'>{teacher.firstName} {teacher.lastName}</span>
                    </div>
                    <div>
                        <span className='list__label'>personnummer: </span>
                        <span className='list__text'>{teacher.personalIdNumber}</span>
                    </div>
                    <div>
                        <span className='list__label'>e-post: </span>
                        <span className='list__text'>{teacher.email}</span>
                    </div>
                    <div>
                        <span className='list__label'>mobilnummer: </span>
                        <span className='list__text'>{teacher.phoneNumber}</span>
                    </div>
                </li>
            ))}
            </ul>  
    )
    
}
 
export default TeachersList;