import './Course.scss';

import {useContext, useEffect, useState} from 'react';
import { useParams, Link } from "react-router-dom";

import ListContext from '../../../store/list-context';

import Button from '../../../components/ui/Button/Button';
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

    return ( 
    <div className='course'>
        {course && 
            <div className='course__wrapper'>
                <h1 className='course__heading'> {course.title} </h1>
                <div className='course__text-wrapper'>
                    <span className='course__label'>Startdatum: </span>
                    <span className='course__text'>{course.startDate}</span>
                </div>
                <div className='course__text-wrapper'>
                    <span className='course__label'>Längd: </span>
                    <span className='course__text'>{course.duration} {course.unit}</span>
                </div>
                <div className='course__text-wrapper'>
                    <span className='course__label'>Kursnummer: </span>
                    <span className='course__text'>{course.courseNumber}</span>
                </div>
                <h2 className='course__description-heading'>Info om kursen: </h2>
                <div className='course__description'>{course.description}</div>
            </div>}
        <Link className='course__link' to={'/courses'}>
            <Button>Gå till kurser</Button>
        </Link>
    </div> );
}
 
export default Course;