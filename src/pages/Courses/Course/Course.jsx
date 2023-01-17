import './Course.scss';

import {useContext, useEffect, useState} from 'react';
import { useParams } from "react-router-dom";

import ListContext from '../../../store/list-context';

const Course = () => {

    const { courseId } = useParams()
    const context = useContext(ListContext);
    const [course, setCourse] = useState(null);
    
    useEffect(() => {
        if(!context.courses.length) {
            context.getData('courses');
        }
    }, [context])
    
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