import { useEffect, useState } from 'react'
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import PropTypes from 'prop-types';


export default function SearchForm({ values, handleInputChange, isValid, setIsValid, onSubmitSearch}) {

  // переменная для отображения не зависящей от валидности формы ошибки под инпутом
  const [isError, setIsError] = useState(false);

  function handleSearch(evt) {
    evt.preventDefault();
    if(values.film !== "" && values.film !== undefined) {
      setIsError(false);
      onSubmitSearch(values);
    } else {
      setIsError(true);
    }
  }

  useEffect(() => {
    setIsValid(true);
  }, []);

  // хук для автоматического изменения списка фильмов при нажатии на чекбокс "короткометражки"
  useEffect(() => {
    // if (values.film) {
      onSubmitSearch(values);
    // }
  }, [values.shorts]);

  return (
    <div className="section search">
      <form 
        className="search__form section__container" 
        name="search-form"
        onSubmit={handleSearch}
      >
        <div className="search__container">
          <input
            className="search__input"
            name="film"
            type="text"
            placeholder="Фильм"
            // required
            onChange={handleInputChange}
            value={values['film'] || ""}
          />
          <button 
            className="button search__button"
            type="submit"
            disabled={!isValid}
          >
            Найти
          </button>
          <span className={`auth__error ${isError && 'auth__error_active'}`}>Нужно ввести ключевое слово</span>
        </div>
        <FilterCheckbox
          onChange={handleInputChange} values={values}
        />
      </form>
    </div>
    
  )
}

SearchForm.propTypes = {
  values: PropTypes.object.isRequired,
  isValid: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  onSubmitSearch: PropTypes.func.isRequired,
  setIsValid: PropTypes.func.isRequired
};