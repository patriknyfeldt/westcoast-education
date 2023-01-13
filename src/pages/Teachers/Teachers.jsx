import './Teachers.scss';

import {useState, useEffect, useContext} from 'react';
import ListContext from '../../store/list-context';

import useFetchData from '../../hooks/use-fetch-data'

import TeachersList from '../../components/TeachersList/TeachersList';

const Teachers = () => {
    
    const { data, error } = useFetchData({url:'http://localhost:3010/teachers'});
    const context = useContext(ListContext);  

    useEffect(() => {
      console.log(context)
      if(data) {
        context.updateList({data, type: 'teachers'});
      }
    }, [data]);

    useEffect(() => {
      if(error) {
        console.log(error)
      }
    }, [error])

    return ( 
        <>
        <h1>Våra lärare</h1>
        {context.teachers && <TeachersList teachers={context.teachers}/>}
        </>
     );
}
 
export default Teachers;