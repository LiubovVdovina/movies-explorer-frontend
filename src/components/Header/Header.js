import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.svg';

export default function Header({ loggedIn, handleBurgerClick, isBurgerOpened }) {

  const headerEndpoints = ['/movies', '/saved-movies', '/profile', '/'];
  const location = useLocation();
  
  if (headerEndpoints.includes(location.pathname)) 
    return (
      <header
        className={`section header ${
          location.pathname === '/' && 'header_theme_dark'
        }`}>
          <div className='section__container header__container'>
          <Link to='/' className='logo link'>
            <img src={logo} alt="логотип" />
          </Link>
          <Navigation
            loggedIn={loggedIn}
            handleBurgerClick={handleBurgerClick}
            isBurgerOpened={isBurgerOpened}
          />
        </div>
      </header>
    )
  else 
    return ('');
}