import './Home.scss';

import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ListContext from '../../store/list-context';

import useFetchData from '../../hooks/use-fetch-data'


const Home = () => {
    const navigate = useNavigate();
    const context = useContext(ListContext);
    const { data, error } = useFetchData({url:'http://localhost:3010/courses'});
    
    useEffect(() => {
      if(data) {
        context.updateList({data, type: 'courses'});
      }
    }, [data]);
  
    useEffect(() => {
      if(error) {
        console.log(error)
      }
    }, [error])

    return ( 
        <div className='home'>
        <h1 className='home__heading'>Våra Utbildningar</h1>
        {context.courses && (
            <ul className='home__list'>
                {context.courses.map((course) => {
                    return (
                    <li key={course.id} onClick={() => navigate(`/courses/${course.id}`, {state: course})} className='home__list-item'>
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