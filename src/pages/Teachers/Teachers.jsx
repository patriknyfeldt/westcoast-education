import './Teachers.scss';

import {useContext, useEffect, useState} from 'react';

import ListContext from '../../store/list-context';

import TeachersList from '../../components/TeachersList/TeachersList';
import AddTeacher from '../../components/AddTeacher/AddTeacher';
import Modal from '../../ui/Modal/Modal';

const Teachers = () => {
    
    const context = useContext(ListContext);
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if(!context.teachers.length) {
            context.getData('teachers');
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
        <h1>Våra lärare</h1>
        <button onClick={openModal}>Lägg till en lärare</button>
        {context.teachers && <TeachersList teachers={context.teachers}/>}
        {showModal && 
        <Modal
        title='Lägg till lärare'
        onClick={closeModal}
        >
            <AddTeacher closeModal={closeModal}/>
        </Modal>}
        </>
     );
}
 
export default Teachers;