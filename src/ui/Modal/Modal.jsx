import './Modal.scss'

import ReactDOM from 'react-dom';


const Overlay = () => {
  return <div className='overlay'></div>
}

const ModalOverlay = ({children, title, onClick}) => {
  return (
    <div className='modal'>
        <header className='modal__header'>
          <h4 className='modal__heading'>{title}</h4>
        </header>
        <div className='modal__content'>
          {children}
        </div>
        <footer className='modal__footer'>
          <button onClick={onClick}>open/close</button>
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