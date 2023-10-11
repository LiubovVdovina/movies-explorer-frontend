import { useMediaQuery } from 'react-responsive';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({cards, isLoading}) {
  const showCards = useMediaQuery({ query: `(max-width: 880px)` }) ? 5 : 8;

  return (
    <div className="section movies-list">
      <div className='section__container movies-list__container'>
        {cards.length === 0 &&
          (
            <p className="search__error">Ничего не найдено</p>
          ) 
        }
        <ul className='movies-list__items'>
          {cards.slice(0,showCards).map((card, index) => (
            <li key={`card${index+1}`} className='movies-list__item'>
              <MoviesCard className="card" card={card} />
            </li>
          ))}
        </ul>
        {cards.length > showCards ? (
                  <button className="button movies-list__button">
                    Ещё
                  </button>
                ) : (
                  ''
        )}
      </div>
    </div>
  );
}