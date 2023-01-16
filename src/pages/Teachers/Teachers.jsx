import './Teachers.scss';

import {useContext} from 'react';

import ListContext from '../../store/list-context';
import useFetchData from '../../hooks/use-fetch-data';

import TeachersList from '../../components/TeachersList/TeachersList';

const Teachers = () => {
    
    const context = useContext(ListContext);
    useFetchData({url:'http://localhost:3010/teachers', type:'teachers'})

    return ( 
        <>
        <h1>Våra lärare</h1>
        {context.teachers && <TeachersList teachers={context.teachers}/>}
        </>
     );
}
 
export default Teachers;