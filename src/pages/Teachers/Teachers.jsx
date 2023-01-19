import './Teachers.scss';

import {useContext, useEffect, useState} from 'react';

import ListContext from '../../store/list-context';

import TeachersList from '../../components/Lists/TeachersList/TeachersList';
import AddTeacher from '../../components/AddTeacher/AddTeacher';
import Modal from '../../ui/Modal/Modal';
import Button from '../../ui/Button/Button';

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
        <div className='teachers'>
        <h1 className='teachers__heading'>Våra lärare</h1>
        <Button onClick={openModal} type='secondary'>Lägg till en lärare</Button>
        {context.teachers && <TeachersList teachers={context.teachers}/>}
        {showModal && 
        <Modal
        title='Lägg till lärare'
        onClick={closeModal}
        >
            <AddTeacher closeModal={closeModal}/>
        </Modal>}
        </div>
     );
}
 
export default Teachers;