import './Teachers.scss';

import {useState, useEffect} from 'react';

import useFetchData from '../../Hooks/use-fetch-data'

import TeachersList from '../../components/TeachersList/TeachersList';

const Teachers = () => {

    const [teachers, setTeachers] = useState([]);
  
    const { data, error } = useFetchData('http://localhost:3010/teachers');
  
    useEffect(() => {
      if(data) {
        setTeachers(data)
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
        {teachers && <TeachersList teachers={teachers}/>}
        </>
     );
}
 
export default Teachers;