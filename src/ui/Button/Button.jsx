import './Button.scss'

const Button = ({type, children, onClick}) => {
    return ( 
        <button onClick={onClick} className={`${type? `button--${type}` : 'button--primary'}`}>
            {children}
        </button>
     );
}
 
export default Button;