 
import './Courses.scss';

import {useState, useEffect, useContext} from 'react';
import ListContext from '../../store/list-context';

import useFetchData from '../../hooks/use-fetch-data'

import CoursesList from '../../components/CoursesList/CoursesList';

const Courses = () => {

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
        <>
        <h1>Våra kurser</h1>
        {context.courses && <CoursesList courses={context.courses}/>}
        </>
     );
}
 
export default Courses;