 import './Courses.scss'

import {useContext, useEffect, useState} from 'react';

import ListContext from '../../store/list-context';

import CoursesList from '../../components/Lists/CoursesList/CoursesList';
import AddCourse from '../../components/Forms/AddCourse/AddCourse';
import Modal from '../../components/ui/Modal/Modal';
import Button from '../../components/ui/Button/Button';

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
        <div className='courses'>
        <h1 className='courses__heading'>Våra kurser</h1>
        <Button onClick={openModal} type='secondary'> Lägg till en kurs </Button> 
        {context.courses && <CoursesList courses={context.courses}/>}
        {showModal && 
            <Modal 
            title='Lägg till kurs'
            onClick={closeModal}
            >
                <AddCourse closeModal={closeModal}/>
            </Modal>}
        </div>
     );
}
 
export default Courses;