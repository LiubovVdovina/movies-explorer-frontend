import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './Register.css';
import logo from '../../images/logo.svg';
import PropTypes from 'prop-types';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { NAME_REGEX, EMAIL_REGEX } from '../../utils/constants';


export default function Register({ isRequestInfo, setIsRequestInfo, onRegister }) {

  const { values, handleInputChange, errors, isValid, resetForm, } = useFormWithValidation();

  useEffect(()=> {
    setIsRequestInfo({
      isOpen: false
    });
  }, []);
  
  const infoSpanClassName = 
    `request-info request-info_place_auth 
    ${isRequestInfo.success ? 'request-info_type_success' : 'request-info_type_fail'} 
    ${isRequestInfo.isOpen && 'request-info_active'}`;

  const namePatternError = `${errors['name'] === "Введите данные в указанном формате." ? "Поле должно содержать только латиницу, кириллицу, пробел или дефис" : errors['name']}`;
  const emailPatternError = `${errors['email'] === "Введите данные в указанном формате." ? "Недействительный email адрес" : errors['email']}`;

  function handleSubmit(evt) {
    evt.preventDefault();
    resetForm();
    onRegister(values);
  }
  
  return (
    <main className="section auth">
      <div className='auth__container'>
        <Link to='/' className='logo logo_place_auth link'>
          <img src={logo} alt="логотип" />
        </Link>
        <h1 className='auth__title'>{'Добро пожаловать!'}</h1>
        <form 
          name="profile"
          className='form form_place_auth'
          onSubmit={handleSubmit}
          noValidate>
          <fieldset className='form__auth-fieldset'> 
            <label 
              className='field form__auth-field field'
              htmlFor='name'
              >
              <span className='field__caption'>Имя</span>
              <input
                className='form__input form__input_place_auth form__input_type_name'
                name="name"
                id="name"
                type="text"
                required
                minLength="2"
                maxLength="40"
                pattern={NAME_REGEX}
                value={values['name'] ?? ''}
                onChange={handleInputChange}
              >
              </input>
              <span className={`auth__error ${errors['name'] && 'auth__error_active'}`}>{namePatternError}</span>
            </label>
            <label 
              className='field form__auth-field field_type_last'
              htmlFor='email'
            >
            <span className='field__caption'>E-mail</span>
              <input
                className='form__input form__input_place_auth form__input_type_email'
                name="email"
                id="email"
                type="email"
                pattern={EMAIL_REGEX}
                required
                value={values['email'] ?? ''}
                onChange={handleInputChange}
              >
              </input>
              <span className={`auth__error ${errors['email'] && 'auth__error_active'}`}>{emailPatternError}</span>
            </label>
            <label 
              className='field form__auth-field field_type_last'
              htmlFor='password'  
            >
            <span className='field__caption'>Пароль</span>
              <input
                className='form__input form__input_place_auth form__input_type_password'
                name="password"
                id="password"
                type="password"
                minLength={6}
                required
                value={values['password'] ?? ''}
                onChange={handleInputChange}
              >
              </input>
              <span className={`auth__error ${errors['password'] && 'auth__error_active'}`}>{errors['password']}</span>
            </label>
          </fieldset>
          <span className={infoSpanClassName}>{isRequestInfo.text}</span>
          <ul className="buttons buttons_place_auth">
            <li className='buttons__item buttons__item_place_auth'>
              <button
              type="submit"
              className={`button button_place_auth`}
              disabled={!isValid}
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

Register.propTypes = {
  isRequestInfo: PropTypes.object.isRequired,
  setIsRequestInfo: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};