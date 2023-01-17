import './Teachers.scss';

import {useContext, useEffect} from 'react';

import ListContext from '../../store/list-context';

import TeachersList from '../../components/TeachersList/TeachersList';

const Teachers = () => {
    
    const context = useContext(ListContext);

    useEffect(() => {
        if(!context.courses.length) {
            context.getData('teachers');
        }
    }, [context])

    return ( 
        <>
        <h1>Våra lärare</h1>
        {context.teachers && <TeachersList teachers={context.teachers}/>}
        </>
     );
}
 
export default Teachers;