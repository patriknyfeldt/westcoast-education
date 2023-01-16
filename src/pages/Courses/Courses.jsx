 
import './Courses.scss';

import {useContext, useState} from 'react';
import ListContext from '../../store/list-context';

import useFetchData from '../../hooks/use-fetch-data'

import CoursesList from '../../components/CoursesList/CoursesList';
import AddCourse from '../../components/AddCourse/AddCourse';
import Modal from '../../ui/Modal/Modal';

const Courses = () => {

    const context = useContext(ListContext);
    const [showModal, setShowModal] = useState(true)
    
    useFetchData({url:'http://localhost:3010/courses', type:'courses'})

    return ( 
        <>
        <h1>Våra kurser</h1>
        {context.courses && <CoursesList courses={context.courses}/>}
        {showModal && 
            <Modal 
            title='Lägg till ny kurs'
            onClick={() => {setShowModal(!showModal)}}
            >
                <AddCourse setShowModal={setShowModal}/>
            </Modal>}
        </>
     );
}
 
export default Courses;