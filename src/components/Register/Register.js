import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';

export default function Register() {

  function handleInputChange() {

  }          
  
  return (
    <main className="section auth">
      <div className='auth__container'>
        <Link to='/' className='logo logo_place_auth link'>
          <img src={logo} alt="логотип" />
        </Link>
        <h1 className='auth__title'>{'Добро пожаловать!'}</h1>
        <form name="profile" className='form form_place_auth'>
          <div className='form__auth-fieldset'> 
            <label className='field form__auth-field field'>
              <span className='field__caption'>Имя</span>
              <input
                className='form__input form__input_place_auth form__input_type_name'
                name="name"
                id="name"
                type="text"
                required
                minLength="2"
                maxLength="40"
                // value={currentUser.name}
                onChange={handleInputChange}
              >
              </input>
            </label>
            <label className='field form__auth-field field_type_last'>
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
            <label className='field form__auth-field field_type_last'>
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
              <span className="auth__error">Текст ошибки</span>
            </label>
          </div>
          <ul className="buttons buttons_place_auth">
            <li className='buttons__item buttons__item_place_auth'>
              <button
              type="submit"
              className={`button button_place_auth`}
              >
              Зарегистрироваться
          </button>
            </li>
            <li className='buttons__item buttons__item_place_auth'>
              <span className="auth__help">
                Уже зарегистрированы?&nbsp;
                <Link to="/signin" className="link auth__link">
                  Войти
                </Link>
              </span> 
            </li>
        </ul>
        </form>
      </div>
    </main>
  );
}