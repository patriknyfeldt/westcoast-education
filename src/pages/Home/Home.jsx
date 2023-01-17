import './Home.scss';

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListContext from '../../store/list-context';

const Home = () => {

    const navigate = useNavigate();
    const context = useContext(ListContext);
    
    useEffect(() => {
        if(!context.courses.length) {
            context.getData('courses');
        }
    }, [context])

    return ( 
        <div className='home'>
        <h1 className='home__heading'>Våra Utbildningar</h1>
        {context.courses && (
            <ul className='home__list'>
                {context.courses.map((course) => {
                    return (
                    <li key={course.id} onClick={() => navigate(`/courses/${course.id}`)} className='home__list-item'>
                        <span>{course.title}</span>
                    </li>
                    )
                })}
            </ul>
        )}
        </div>
     );
}
 
export default Home;