import './Button.scss'

const Button = ({type, children, onClick, disabled}) => {
    return ( 
        <button disabled={disabled} onClick={onClick} className={ `${type? `button--${type}` : 'button--primary'}` }>
            {children}
        </button>
     );
}
 
export default Button;