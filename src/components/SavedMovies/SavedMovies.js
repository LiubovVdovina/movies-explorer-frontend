import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import {testCards} from '../../utils/constants'
const testEmptyCards = []

export default function SavedMovies({isLoading}) {
  return (
    <main className="movies ">
      <div className="movies__container">
        <SearchForm />
        {isLoading ? <Preloader /> : <MoviesCardList cards={testCards.filter((card) => card.isSaved)}/>}

      </div>
    </main>
  );
}