import './SavedMovies.css';
import { useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import PropTypes from 'prop-types';
import useFormWithValidation from '../../hooks/useFormWithValidation';

export default function SavedMovies({isLoading, onClickLike, isRequestInfo,setIsRequestInfo, savedMoviesList, filterSavedMovies}) {

  // console.log('Компонент SavedMovies получил следующий список сохраненных фильмов', savedMoviesList);
  const { values, isValid, setIsValid, handleInputChange } = useFormWithValidation();

  useEffect(() => {
    setIsRequestInfo({
      isOpen: false,
      success: true,
      text: ''
    });
    filterSavedMovies(values);
  }, []);
  
  useEffect(() => {
    if(savedMoviesList.length === 0) {
      if(values.film === "" || values.film === undefined) {
        setIsRequestInfo({
          isOpen: true,
          success: false,
          text: 'Вы еще не сохранили ни одного фильма.'
        });
      } else {
        setIsRequestInfo({
          isOpen: true,
          success: false,
          text: 'Ничего не найдено.'
        });
      }
    }
  }, [savedMoviesList]);

  return (
    <main className="movies">
      <div className="movies__container">
        <SearchForm 
          values={values}
          handleInputChange={handleInputChange}
          isValid={isValid}
          setIsValid={setIsValid}
          onSubmitSearch={filterSavedMovies}
        />
        {isLoading ? <Preloader /> : <MoviesCardList isRequestInfo={isRequestInfo} cards={savedMoviesList} onClickLike={onClickLike}/> }

      </div>
    </main>
  );
}

SavedMovies.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onClickLike: PropTypes.func.isRequired,
  isRequestInfo: PropTypes.object.isRequired,
  setIsRequestInfo: PropTypes.func.isRequired,
  savedMoviesList: PropTypes.array.isRequired,
  filterSavedMovies: PropTypes.func.isRequired,
}