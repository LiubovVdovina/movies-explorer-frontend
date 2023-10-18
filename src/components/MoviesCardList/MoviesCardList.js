import { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import PropTypes from 'prop-types';

export default function MoviesCardList({isRequestInfo, cards, onClickLike }) {

  // console.log('MoviesCardList получил следующий информационный объект:', isRequestInfo);
  // все, что относится к подсчету количества карточек на странице
  const [showCards, setShowCards] = useState(12);
  const [addCards, setAddCards] = useState(3);

  function countShowCards() {
    const width = window.innerWidth;
    if (width >= 1280) {
      setShowCards(16);
      setAddCards(4);
    } else if (width >= 990) {
      setShowCards(12);
      setAddCards(3);
    } else if (width >=660) {
      setShowCards(8);
      setAddCards(2);
    } else {
      setShowCards(5);
      setAddCards(2);
    }
  }

  useEffect(() => {
    countShowCards();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', countShowCards);
    }, 1000);
  });

  function handleClickShowMore() {
    setShowCards(showCards + addCards);
  }

  // console.log('MoviesCardList получил вот такие карточки: ', cards);
  return (
    <div className="section movies-list">
      <div className='section__container movies-list__container'>
          <p className={`search__error ${isRequestInfo.isOpen && 'search__error_active'}`}>{isRequestInfo.text}</p>
        <ul className='movies-list__items'>
          {cards.slice(0,showCards).map((card) => (
            <li key={card._id ?? card.id} className='movies-list__item'>
              <MoviesCard 
                className="card"
                movie={card}
                onClickLike={onClickLike}
              />
            </li>
          ))}
        </ul>
        {cards.length > showCards ? (
                  <button className="button movies-list__button" onClick={handleClickShowMore}>
                    Ещё
                  </button>
                ) : (
                  ''
        )}
      </div>
    </div>
  );
}

MoviesCardList.propTypes = {
  isRequestInfo: PropTypes.object.isRequired,
  cards: PropTypes.array,
  onClickLike: PropTypes.func.isRequired
}