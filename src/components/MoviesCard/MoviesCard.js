import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function MoviesCard({ movie, onClickLike }) {
  const page = useLocation().pathname;
  // console.log('MoviesCardList получил вот такую карточку: ', movie);
  // console.log('MoviesCard получил карточку со следующим nameRU: ', movie.nameRU);
  let defaultIsLiked;

    if(page === "/saved-movies") {
      defaultIsLiked = true;
    } else if(page === "/movies" && movie._id !== undefined) {
      defaultIsLiked = true;
    } else {
      defaultIsLiked = false;
    }

  // console.log('defaultIsLiked', defaultIsLiked);
  const [isLiked, setIsLiked] = useState(defaultIsLiked); //переменная для хранения состояния лайка карточки

  const buttonClassName = 
  `button card__button ${!isLiked ? 'card__button_type_not-saved' : ''} ${(
    isLiked && page === '/saved-movies') ? 'card__button_type_remove' : ''} ${(
      isLiked && page === '/movies') ? 'card__button_type_saved' : ''}`;

  // console.log(`Для карточки ${movie.nameRU} класс кнопки лайка : \n${buttonClassName}`);

  function handleClickLike(evt) {
    evt.stopPropagation();
    onClickLike(movie, isLiked, setIsLiked);
  }

  // функция перевода длительности в формат макета
  function countDuration(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    if(hours === 0) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }


  return (
    <div className='card-item'>
      <a className="card" href={movie.trailerLink}>
        <img className="card__image" src={ typeof movie.image === 'string' ? movie.image : `https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} />
        <div className="card__info">
          <div className='card__caption'>
            <p className='card__title'>{movie.nameRU}</p>
            {/* {isLiked ? (
              <button 
                className={`button card__button 
                  ${page === '/saved-movies' ? 'card__button_type_remove' : 'card__button_type_saved'}`}
                  onClick={handleClickLike}
              >
              </button>
            ) :
            (
              <button 
                className='button card__button card__button_type_not-saved'
                onClick={handleClickLike}
              ></button>
            )} */}
          </div>
          <span className="card__duration">{countDuration(movie.duration)}</span>
        </div>
      </a>
      <button
        className={buttonClassName}
        onClick={handleClickLike}
      ></button>
    </div>
  )
}

MoviesCard.propTypes = {
  movie: PropTypes.object,
  onClickLike: PropTypes.func.isRequired
  // isLoading: PropTypes.bool
}