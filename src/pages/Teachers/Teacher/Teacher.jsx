import './Teacher.scss';

import {useContext, useEffect, useState} from 'react';
import { useParams } from "react-router-dom";

import ListContext from '../../../store/list-context';

const Teacher = () => {
    const { teacherId } = useParams()
    const context = useContext(ListContext);
    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        if(!context.courses.length) {
            context.getData('teachers');
        }
    }, [context])
    
    useEffect(() => {
        const currentTeacher = context.teachers.find(teacher => teacher.id === +teacherId )
        setTeacher(currentTeacher);
    }, [teacherId, context.teachers])

    return ( <>
    <div> kurs id: {teacherId}</div>
    {teacher && <div> {teacher.firstName} {teacher.lastName}</div>}
    </> );
}
 
export default Teacher;