
import './navbar.scss'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul className='navbar__list'>
        <li className='navbar__list-item'>
          <Link className='navbar__link' to='/'>Hem</Link>
        </li>
        <li>
          <Link className='navbar__link' to='/courses'>Kurser</Link>
        </li>
        <li>
          <Link className='navbar__link' to='/teachers'>Lärare</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
