 
import './Courses.scss';

import {useContext} from 'react';
import ListContext from '../../store/list-context';

import useFetchData from '../../hooks/use-fetch-data'

import CoursesList from '../../components/CoursesList/CoursesList';

const Courses = () => {

    const context = useContext(ListContext);
    
    useFetchData({url:'http://localhost:3010/courses', type:'courses'})

    return ( 
        <>
        <h1>Våra kurser</h1>
        {context.courses && <CoursesList courses={context.courses}/>}
        </>
     );
}
 
export default Courses;