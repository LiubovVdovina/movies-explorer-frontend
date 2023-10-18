import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.svg';
import PropTypes from 'prop-types';

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

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  isBurgerOpened: PropTypes.bool.isRequired,
  handleBurgerClick: PropTypes.func.isRequired,
};