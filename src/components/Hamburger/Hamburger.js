import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import './Hamburger.css';
import {useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Hamburger({ isBurgerOpened, handleBurgerClick }) {
  // контроль ширины экрана, для правильной логики работы классов и отображения меню
  const isMobile = useMediaQuery({ query: `(max-width: 880px)` });

  function handleOnClickBurger() {
    handleBurgerClick();
  }

  // чтобы бургер-меню автоматически закрылось, если размер страницы увеличится
  useEffect(() => {
    if (!isMobile && isBurgerOpened) {
      handleBurgerClick();
    }
  }, [isBurgerOpened, isMobile, handleBurgerClick]);

  return (
    <button
      type="button"
      className={`link hamburger-button hamburger-button_${
        isBurgerOpened ? 'on' : 'off'
      } ${
        useLocation().pathname === '/' && 'hamburger-button_light'
      }`}
      onClick={handleOnClickBurger}
    >
      <span></span>
    </button>
  );
}

Hamburger.propTypes = {
  isBurgerOpened: PropTypes.bool.isRequired,
  handleBurgerClick: PropTypes.func.isRequired,
};