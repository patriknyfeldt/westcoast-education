import './header.scss'

import Navbar from '../Navbar/Navbar';

const Header = () => {
    return ( 
        <header className="header">
            <h1 className="header__heading">Westcoast Education</h1>
            <Navbar />
        </header>
     );
}
 
export default Header;