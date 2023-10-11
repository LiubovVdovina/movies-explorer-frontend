import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logo.svg';

export default function Login() {

  function handleInputChange() {

  }          
  
  return (
    <main className="section section_type_auth">
      <div className='form__container_type_auth '>
        <Link to='/' className='logo logo_place_auth link'>
          <img src={logo} alt="логотип" />
        </Link>
        <h1 className='form__title'>Рады видеть!</h1>
        <form name="profile" className='profile__form_place_auth form'>
          <div className='form__fieldset_place_auth'>
            <label className='form__field_place_auth form__field_type_last'>
            <span className='field__caption'>E-mail</span>
              <input
                className='form__input form__input_place_auth form__input_type_email'
                name="email"
                id="email"
                type="email"
                required
                // value={currentUser.email}
                onChange={handleInputChange}
              >
              </input>
            </label>
            <label className='form__field_place_auth form__field_type_last'>
            <span className='field__caption'>Пароль</span>
              <input
                className='form__input form__input_place_auth form__input_type_password'
                name="password"
                id="password"
                type="password"
                required
                // value={currentUser.email}
                onChange={handleInputChange}
              >
              </input>
              <span className="register__error">Текст ошибки</span>
            </label>
          </div>
          <ul className="form__buttons">
            <li className='buttons__item buttons__item_place_auth'>
              <button
              type="submit"
              className={`button form__button_place_auth`}
              >
                Войти
          </button>
            </li>
            <li className='buttons__item buttons__item_place_auth'>
              <span className="register__help">
              Ещё не зарегистрированы?&nbsp;
                <Link to="/signup" className="link register__link">
                Регистрация
                </Link>
              </span> 
            </li>
        </ul>
        </form>
      </div>
    </main>
  );
}