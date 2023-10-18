import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './Login.css';
import logo from '../../images/logo.svg';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import PropTypes from 'prop-types';
import { EMAIL_REGEX } from '../../utils/constants'

export default function Login({ isRequestInfo, setIsRequestInfo, onLogin }) {
    // контроль инпутов и валидация
  const {
    values, handleInputChange, errors, isValid, resetForm,
  } = useFormWithValidation();
  
  useEffect(()=> {
    setIsRequestInfo({
      isOpen: false
    });
  }, []);
  
  const emailPatternError = `${errors['email'] === "Введите данные в указанном формате." ? "Недействительный email адрес" : errors['email']}`;

  const infoSpanClassName = 
    `request-info request-info_place_auth 
    ${isRequestInfo.success ? 'request-info_type_success' : 'request-info_type_fail'} 
    ${isRequestInfo.isOpen && 'request-info_active'}`;

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({ email: values.email, password: values.password});
    resetForm();
  }

  return (
    <main className='section auth'>
      <div className='auth__container '>
        <Link to='/' className='logo logo_place_auth link'>
          <img src={logo} alt="логотип" />
        </Link>
        <h1 className='auth__title'>Рады видеть!</h1>
        <form 
          name="login"
          className='form form_place_auth'
          onSubmit={handleSubmit}
          noValidate
        >
          <fieldset className='form__auth-fieldset'>
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
                required
                pattern = {EMAIL_REGEX}
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
                required
                minLength={6}
                maxLength={30}
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
                Войти
          </button>
            </li>
            <li className='buttons__item buttons__item_place_auth'>
              <span className="auth__help">
              Ещё не зарегистрированы?&nbsp;
                <Link to="/signup" className="link auth__link">
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

Login.propTypes = {
  isRequestInfo: PropTypes.object.isRequired,
  setIsRequestInfo: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};