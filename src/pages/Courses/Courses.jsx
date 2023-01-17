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

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return ( 
        <>
        <h1>Våra kurser</h1>
        <button onClick={openModal}>Lägg till en kurs</button>
        {context.courses && <CoursesList courses={context.courses}/>}
        {showModal && 
            <Modal 
            title='Lägg till kurs'
            onClick={closeModal}
            >
                <AddCourse closeModal={closeModal}/>
            </Modal>}
        </>
     );
}
 
export default Courses;