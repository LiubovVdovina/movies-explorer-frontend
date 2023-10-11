import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import Hamburger from '../Hamburger/Hamburger';

export default function Navigation({ loggedIn, handleBurgerClick, isBurgerOpened }) {
  
  const activeLink = `navigation__link_active_${isBurgerOpened ? 'mobile' : 'desktop'}`;

  function handleClickOverlay(e) {
    e.stopPropagation();
  }

  return (
    <>
      {!loggedIn ? (
        <nav className="navigation">
          <ul className="navigation__list navigation__list_type_auth">
            <li>
              <Link to='/signup' className='link navigation__link navigation__link_type_auth'>
                Регистрация
              </Link>
            </li>
            <li>
              <Link to='/signin' className='link navigation__link navigation__link_type_auth navigation__link_type_signin'>
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className={`navigation navigation_state_${isBurgerOpened ? 'opened' : 'closed'}`} onClick={isBurgerOpened ? handleBurgerClick : undefined}>
          <Hamburger isBurgerOpened={isBurgerOpened} handleBurgerClick={handleBurgerClick} />
          <ul className={`navigation__list navigation__list_logged navigation__list_state_${isBurgerOpened ? 'opened' : 'closed'}`} onClick={handleClickOverlay}>
            <div className="navigation__links">
                {isBurgerOpened && (
                  <li className="navigation__item">
                    <NavLink to='/' className={({ isActive }) => isActive ? 'navigation__link link '+activeLink : 'navigation__link link'}>
                      Главная
                    </NavLink>
                  </li>
                )}
                <li className="navigation__item">
                  <NavLink to='/movies' className={({ isActive }) => isActive ? 'navigation__link link '+activeLink : 'navigation__link link'}>
                    Фильмы
                  </NavLink>
                </li>
                <li className="navigation__item">
                  <NavLink to='/saved-movies' className={({ isActive }) => isActive ? 'navigation__link link '+activeLink : 'navigation__link link'}>
                    Сохранённые фильмы
                  </NavLink>
                </li>
              </div>
              <li className="navigation__item">
                <Link className='navigation__account link' to='/profile'>
                  <span>Аккаунт</span>
                  <div className='account-icon' />
                </Link>
              </li>
          </ul>
        </nav>
      )}
    </>
  );
}