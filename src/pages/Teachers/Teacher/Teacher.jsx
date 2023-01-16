import './Teacher.scss';

import { useParams } from "react-router-dom";
import {useContext, useEffect, useState} from 'react';

import useFetchData from '../../../hooks/use-fetch-data';
import ListContext from '../../../store/list-context';

const Teacher = () => {
    const { teacherId } = useParams()

    useFetchData({url:'http://localhost:3010/teachers', type:'teachers'})
    const context = useContext(ListContext);
    const [teacher, setTeacher] = useState(null);
    
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