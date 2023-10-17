import { useEffect, useContext } from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import PropTypes from 'prop-types';
import { NAME_REGEX, EMAIL_REGEX } from '../../utils/constants';

export default function Profile({isRequestInfo, setIsRequestInfo, handleEditUser, handleSignOut}) {
  const {
    values, errors, isValid, setIsValid, resetForm, handleInputChange,
  } = useFormWithValidation();

  useEffect(()=> {
    setIsRequestInfo({
      isOpen: false
    });
  }, []);

  const namePatternError = `${errors['name'] === "Введите данные в указанном формате." ? "Поле должно содержать только латиницу, кириллицу, пробел или дефис" : errors['name']}`;
  const emailPatternError = `${errors['email'] === "Введите данные в указанном формате." ? "Недействительный email адрес" : errors['email']}`;

  const infoSpanClassName = 
    `request-info request-info_place_profile 
    ${isRequestInfo.success ? 'request-info_type_success' : 'request-info_type_fail'} 
    ${isRequestInfo.isOpen && 'request-info_active'}`;

  function handleSubmitEditUser(evt) {
    evt.preventDefault();
    handleEditUser({ name: values.name, email: values.email });
  }

  function handleOnChange(evt) {
    handleInputChange(evt);
    const currentValue = { ...values };
    const { name, value } = evt.target;
    currentValue[name] = value;
    if (
      currentUser.name === currentValue.name &&
      currentUser.email === currentValue.email
    ) {
      setIsValid(false);
    }
  }
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    resetForm(
      { name: currentUser.name, email: currentUser.email },
      { name: "", email: "" }
    );
  }, [currentUser]);

  return (
    <main className="section profile">
      <div className='profile__container'>
        <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
        <form 
          name="profile" 
          className='form form_place_profile'
          onSubmit={handleSubmitEditUser}
        >
          <div className='form__fieldset'>
            <label 
            className='form__field field'
            htmlFor='name'  
          >
              Имя
              <input
                className='form__input form__input_place_profile form__input_type_name'
                name="name"
                id="name"
                type="text"
                required
                minLength="2"
                maxLength="40"
                pattern={NAME_REGEX}
                value={values['name'] || ""}
                onChange={handleOnChange}
              >
              </input>
              <span className={`profile__error ${errors['name'] && 'profile__error_active'}`}>{namePatternError}</span>
            </label>
            <label 
            className='form__field field field_type_last'
            htmlFor='email'  
          >
              E-mail
              <input
                className='form__input form__input_place_profile form__input_type_email'
                name="email"
                id="email"
                type="email"
                required
                pattern={EMAIL_REGEX}
                value={values['email'] || ""}
                onChange={handleOnChange}
              >
              </input>
              <span className={`profile__error ${errors['email'] && 'profile__error_active'}`}>{emailPatternError}</span>
            </label>
          </div>
          <span className={infoSpanClassName}>{isRequestInfo.text}</span>
          <ul className="buttons buttons_place_profile">
            <li className='buttons__item'>
              <button
              type="submit"
              className={`button form__button`}
              disabled={!isValid}
            >
              Редактировать
          </button>
            </li>
            <li className='buttons__item'>
              <button 
              type="submit"
              className="button form__button form__button_type_logout" 
              onClick={handleSignOut}
              >
              Выйти из аккаунта
            </button>
            </li>
        </ul>
        </form>
      </div>
    </main>
  );
}

Profile.propTypes = {
  isRequestInfo: PropTypes.object.isRequired,
  setIsRequestInfo: PropTypes.func.isRequired,
  handleEditUser: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired,
};