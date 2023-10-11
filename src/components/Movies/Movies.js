import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


import {testCards} from '../../utils/constants'
const testEmptyCards = []

export default function Movies({isLoading}) {
  return (
    <main className="movies ">
      <div className="movies__container">
        <SearchForm />
        {isLoading ? <Preloader /> : <MoviesCardList cards={testCards}/>}

      </div>
    </main>
  );
}