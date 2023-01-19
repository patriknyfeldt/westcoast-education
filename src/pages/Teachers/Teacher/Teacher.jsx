import './Teacher.scss';

import {useContext, useEffect, useState} from 'react';
import { useParams, Link } from "react-router-dom";

import ListContext from '../../../store/list-context';

import Button from '../../../ui/Button/Button';

const Teacher = () => {
    const { teacherId } = useParams()
    const context = useContext(ListContext);
    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        if(!context.teachers.length) {
            context.getData('teachers');
        }
    }, [context])
    
    useEffect(() => {
        const currentTeacher = context.teachers.find(teacher => teacher.id === +teacherId )
        setTeacher(currentTeacher);
    }, [teacherId, context.teachers])

    return ( 
    <div className='teacher'>
        {teacher && 
            <div className='teacher__wrapper'>
                <h1 className='teacher__heading'> {teacher.firstName} {teacher.lastName} </h1>
                <div className='teacher__text-wrapper'>
                    <span className='teacher__label'>Personnummer: </span>
                    <span className='teacher__text'>{teacher.personalIdNumber}</span>
                </div>
                <div className='teacher__text-wrapper'>
                    <span className='teacher__label'>E-post: </span>
                    <span className='teacher__text'>{teacher.email}</span>
                </div>
                <div className='teacher__text-wrapper'>
                    <span className='teacher__label'>Mobilnummer: </span>
                    <span className='teacher__text'>{teacher.phoneNumber}</span>
                </div>
                <ul className='teacher__competencies-list'>
                <h2 className='teacher__list-heading'>Kompetenser:</h2>
                {teacher.competencies?.map((competence, i) => {
                    return (
                        <li key={i}>
                            {competence}
                        </li>
                    )
                })}
                </ul>
            </div>}
        <Link className='teacher__link' to={'/teachers'}>
            <Button>Gå tillbaka</Button>
        </Link>
    </div> );
}
 
export default Teacher;