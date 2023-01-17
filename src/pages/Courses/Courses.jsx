 import './Courses.scss';

import {useContext, useEffect, useState} from 'react';
import ListContext from '../../store/list-context';

import CoursesList from '../../components/CoursesList/CoursesList';
import AddCourse from '../../components/AddCourse/AddCourse';
import Modal from '../../ui/Modal/Modal';

const Courses = () => {

    const context = useContext(ListContext);
    const [showModal, setShowModal] = useState(false)
    
    useEffect(() => {
        if(!context.courses.length) {
            context.getData('courses');
        }
    }, [context])

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