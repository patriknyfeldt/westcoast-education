import './Home.scss';

import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ListContext from '../../store/list-context';

const Home = () => {

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
                        <li key={course.id}  className='home__list-item'>
                            <h2 className='home__course-title'>{course.title}</h2>
                            <p className='home__text'>{course.description.slice(0, 120)}...</p>
                            <Link className='home__link' to={`/courses/${course.id}`}>
                                Läs mer
                            </Link>
                        </li>
                    )
                })}
            </ul>
        )}
        </div>
     );
}
 
export default Home;