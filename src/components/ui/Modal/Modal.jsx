import './Modal.scss'

import ReactDOM from 'react-dom';

import { IoCloseSharp } from "react-icons/io5";

const Overlay = () => {
  return <div className='overlay'></div>
}

const ModalOverlay = ({children, title, onClick}) => {
  return (
    <div className='modal'>
        <header className='modal__header'>
          <h4 className='modal__heading'>{title}</h4>
          <IoCloseSharp className='modal__close-icon' onClick={onClick}/>
        </header>
        <main className='modal__main'>
          <div className='modal__content'>
            {children}
          </div>
        </main>
        <footer className='modal__footer'>
        </footer>
    </div>
  );
};

const Modal = (props) => {
  return (
      <>
          {ReactDOM.createPortal(
              <Overlay />,
              document.querySelector('#overlay-root'),
          )}
          {ReactDOM.createPortal(
              <ModalOverlay
              {...props} 
              >
                  {props.children}
              </ModalOverlay>,
              document.querySelector('#modal-root')
          )}
      </>
  )
}


export default Modal;