import { useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import PropTypes from 'prop-types';
import useFormWithValidation from '../../hooks/useFormWithValidation';

export default function Movies({
  isLoading, 
  setIsLoading,
  onClickLike, 
  filteredMoviesList, 
  filterMovieList,
  renderSavedMoviesIds,
  isRequestInfo,
  setIsRequestInfo,
  onSubmitSearch}) {

  // console.log('Movies получил вот такие карточки: ', filteredMoviesList);

  const { values, setValues, isValid, setIsValid, handleInputChange } = useFormWithValidation();

  // при рендере один раз выполняем проверку на наличие сохраненных поисков
  useEffect(() => {
    setIsLoading(true);
    setIsRequestInfo({
      isOpen: false,
      success: true,
      text: ''
    });
    // есть ли уже сохраненные параметры поиска?
    const filterMoviesParams = JSON.parse(localStorage.getItem("filterParams"));
    // если да, то записываем их значения в инпуты
    if (filterMoviesParams) {
      setValues(filterMoviesParams);
    }
    // есть ли уже сохраненный список отфильтрованных фильмов?
    const filteredMoviesListFromLocalStorage = JSON.parse(localStorage.getItem("filteredMoviesList"));
    if(filteredMoviesListFromLocalStorage) {
      // если да, то рендерим их id для корректного отображения лайка
      renderSavedMoviesIds(filteredMoviesListFromLocalStorage);
    } else if (filterMoviesParams) {
      // если в хранилище нет файла с отфильтрованными фильмами, 
      //но есть сохраненные параметры фильтрации, то фильтруем фильмы по сохраненным параметрам
      filterMovieList();
    }
  }, []);

  return (
    <main className="movies">
      <div className="movies__container">
        <SearchForm 
          values={values}
          handleInputChange={handleInputChange}
          isValid={isValid}
          setIsValid={setIsValid}
          onSubmitSearch={onSubmitSearch}
        />
        {isLoading ? <Preloader /> : <MoviesCardList isRequestInfo={isRequestInfo} cards={filteredMoviesList} onClickLike={onClickLike}/>}

      </div>
    </main>
  );
}

Movies.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  onSubmitSearch: PropTypes.func.isRequired,
  filteredMoviesList: PropTypes.array.isRequired,
  onClickLike: PropTypes.func.isRequired,
  filterMovieList: PropTypes.func.isRequired,
  renderSavedMoviesIds: PropTypes.func.isRequired,
  isRequestInfo: PropTypes.object.isRequired,
  setIsRequestInfo: PropTypes.func.isRequired
};