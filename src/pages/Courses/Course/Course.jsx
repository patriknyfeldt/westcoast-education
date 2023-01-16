import './Course.scss';

import { useParams } from "react-router-dom";
import {useContext, useEffect, useState} from 'react';

import useFetchData from '../../../hooks/use-fetch-data';
import ListContext from '../../../store/list-context';

const Course = () => {
    const { courseId } = useParams()

    useFetchData({url:'http://localhost:3010/courses', type:'courses'})
    const context = useContext(ListContext);
    const [course, setCourse] = useState(null);
    
    useEffect(() => {
        const currentCourse = context.courses.find(course => course.id === +courseId )
        setCourse(currentCourse);
    }, [courseId, context.courses])

    return ( <>
    <div> kurs id: {courseId}</div>
    {course && <div> {course.title}</div>}
    </> );
}
 
export default Course;