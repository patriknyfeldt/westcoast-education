import './Header.scss'

import { Link } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';

const Header = () => {
    return (
        <header className="header">
            <Link className='header__link' to='/'>
                <h1 className="header__heading">Westcoast Education</h1>
            </Link>
            <Navbar />
        </header>
     );
}
 
export default Header;