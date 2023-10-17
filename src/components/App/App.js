import { useState, useEffect} from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

import './App.css';
import {api} from '../../utils/MainApi'

// импорт компонентов
import Header from '../Header/Header'
import Footer from '../Footer/Footer';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import Login from '../Login/Login'
import Register from '../Register/Register'
import Profile from '../Profile/Profile'

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import NotFound from '../NotFound/NotFound'
import { beatApi } from '../../utils/MoviesApi';

export default function App() {

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    {
      name: '',
      email: ''
    }
  ); // переменная состояния, хранящая данные текущего пользователя
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isRequestInfo, setIsRequestInfo] = useState({
    isOpen: false,
    success: false,
    text: ''
  })

  // Все что касается фильмов

  const [filteredMoviesList, setFilteredMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);

  // функция при нажатии на кнопку лайк
  function onClickLike(movie, isLiked, setIsLiked) {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      if(isLiked) {
        // console.log('Убираем лайк у следующей карточки: ', movie);
        api.deleteSavedMovie(movie._id, jwt)
          .then(() => {
            setIsLiked(false);
            movie._id = undefined;
            setSavedMoviesList(
              savedMoviesList.filter((film) => film._id !== movie._id)
            );  
          })
          .catch((err) => console.log(`Ошибка: ${err}`));
      } else {
        // console.log('Ставим лайк следующей карточке: ', movie);
        api.postSavedMovie(movie, jwt)
          .then((res) => {
            // console.log('Ответ сервера на postSavedMovie', res);
            setIsLiked(true);
            //присваиваем фильму сгенерированный базой id, 
            //чтобы в последующем мы могли удалить фильм из сохраненных по id
            //у не сохраненных фильмов данное поле будет undefined
            movie._id = res.movie._id;
            // console.log('Карточка теперь имеет свой _id: ', movie);
          })
          .catch((err) => console.log(`Ошибка: ${err}`));
      }
    } else setIsLoggedIn(false);
  }

  // функция по присвоению апишного id сохраненным фильмам 
  // в т.ч. для корректной отрисовки кнопки лайка на странице "Фильмы"
  function renderSavedMoviesIds(moviesList) {
    // console.log('renderSavedMoviesIds запущена для следующего списка фильмов:', moviesList);
    const jwt = localStorage.getItem("token");
    if (isLoggedIn && jwt) {
      // console.log('Проверка, что есть токен и пользователь залогинен внутри функции renderSavedMoviesIds прошла успешно');
      setIsLoading(true);
      api.getSavedMovies(jwt)
        .then((savedMovies) => {
          const savedMoviesIds = {};
          savedMovies.forEach((movie) => {
            savedMoviesIds[movie.movieId] = movie._id;
          });

          moviesList = moviesList.map((movie) => {
            if (savedMoviesIds[movie.id] !== undefined) {
              movie._id = savedMoviesIds[movie.id];
            }
            return movie;
          });
          setFilteredMoviesList(moviesList);
        })
        .catch(() => {
          setIsRequestInfo({
            isOpen: true,
            success: false,
            text: `Во время запроса произошла ошибка. Возможно, проблема 
              с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`
          })
        })
        .finally(() => setIsLoading(false));
    }
  }

  // функция загрузки и при необходимости фильтрации сохраненных фильмов с последующим сохранением в стейт переменную savedMoviesList
  function filterSavedMovies(filters) {
    const jwt = localStorage.getItem("token");
    if(isLoggedIn && jwt) {
      setIsLoading(true);
      api.getSavedMovies(jwt)
        .then((res) => {
          let filteredSavedMovies;
          if(filters.film || filters.shorts) {
            const movieName = filters.film;
            const onlyShorts = filters.shorts ?? false;

            if(onlyShorts) {
              // console.log('Чек-бокс "короткометражки" включен, фильтруем: ', onlyShorts);
              filteredSavedMovies = res
                .filter((movie) => {
                  return movie.duration <= 40;
                })
              if(movieName) {
                // console.log('Был введен поисковой запрос, фильтруем: ', movieName);
                filteredSavedMovies = filteredSavedMovies
                  .filter(movie => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()))
              }
            } else {
              // console.log('Был введен поисковой запрос, но не отмечены "короткометражки", фильтруем: ', movieName);
              filteredSavedMovies = res
                .filter((movie) => {
                  // console.log('Текущий проверяемый фильм:', movie);
                  // console.log(`Проверка содержит ли ${movie.nameRU.toLowerCase()} в себе ${movieName.toLowerCase()} ?
                  //   \n Результат: ${movie.nameRU.toLowerCase().includes(movieName.toLowerCase())}`);
                  return movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
                })
                // console.log('Список фильмов после фильтрации: ', filteredSavedMovies);
            }
            if(filteredSavedMovies.length === 0) {
              setIsRequestInfo({
                isOpen: true,
                success: false,
                text: 'Ничего не найдено'
              });
              setSavedMoviesList([]);
            }
          } else {
            filteredSavedMovies = res;
            if(filteredSavedMovies.length === 0) {
              setIsRequestInfo({
                isOpen: true,
                success: false,
                text: 'Вы еще не сохранили ни одного фильма.'
              });
              setSavedMoviesList([]);
            }
          }

          if(filteredSavedMovies.length !== 0) {
            setIsRequestInfo({
              isOpen: false,
              success: true,
              text: ''
            });
            setSavedMoviesList(filteredSavedMovies);
          }
        })
        .catch(() => {
          setIsRequestInfo({
            isOpen: true,
            success: false,
            text: `Во время запроса filterSavedMovies произошла ошибка. Возможно, проблема 
              с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`
          })
        })
        .finally(() => setIsLoading(false));
    }
  }
  // функция получения от апи всего списка фильмов, если его еще нет в хранилище
  function getMovieList() {
    const movieList = JSON.parse(localStorage.getItem('movieList'));
    if (!movieList) {
      return beatApi.getMovies();
    } else {
      return movieList;
    }
  }

  // функция фильтрации фильмов по введенному запросу
  function filterMovieList() {
    // обнуление переменной информации об успешности запроса
    setIsRequestInfo({
      isOpen: false,
      success: false,
      text: ''
    });

    const jwt = localStorage.getItem("token");
    if(jwt) {
      setIsLoading(true);
      //и обычные и сохраненные?
      Promise.all([getMovieList(), api.getSavedMovies(jwt)])
        .then((promisesResults) => {
          // сохраняем полученные массивы фильмов в соответствующие переменные
          const [movies, savedMovies] = promisesResults;
          // считываем параметры фильтрации из файла в локальном хранилище
          const filterMoviesParams = JSON.parse(
            localStorage.getItem("filterParams")
          );
          // console.log('Получен вот такой список фильмов: ', movies);
          // console.log('Получены следующие параметры фильтрации фильмов: ', filterMoviesParams);

          let filteredMovies;
          if(filterMoviesParams) {
            const movieName = filterMoviesParams.film;
            const onlyShorts = filterMoviesParams.shorts ?? false;
            
            // console.log(`Параметры фильтрации: \n Название: ${movieName}. Короткометражки: ${onlyShorts}`);

            if(onlyShorts) {
              // console.log('Чек-бокс "короткометражки" включен, фильтруем: ', onlyShorts);
              filteredMovies = movies
                .filter((movie) => {
                  return movie.duration <= 40;
                })
              if(movieName) {
                // console.log('Был введен поисковой запрос, фильтруем: ', movieName);
                filteredMovies = filteredMovies
                  .filter(movie => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()))
              }
            } else {
              filteredMovies = movies
                .filter((movie) => {
                  // console.log('Текущий проверяемый фильм:', movie);
                  // console.log(`Проверка содержит ли ${movie.nameRU.toLowerCase()} в себе ${movieName.toLowerCase()} ?
                  //   \n Результат: ${movie.nameRU.toLowerCase().includes(movieName.toLowerCase())}`);
                  return movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
                })
            }
            // console.log('Отфильтрованные по запросу фильмы: ', filteredMovies);
            // console.log('Количество фильмов по запросу', filteredMovies.length);
            localStorage.setItem(
              "filteredMoviesList",
              JSON.stringify(filteredMovies)
            );

          // рендерим id сохраненных фильмов по апи
          // console.log('Сохраненные фильмы полученные по запросу от сервера: ', savedMovies);
          const savedMoviesIds = {};
          savedMovies.forEach((elem) => savedMoviesIds[elem.movieId] = elem._id);

          // console.log('Id для рендера: ', savedMoviesIds);
          // в списке отфильтрованных фильмов рендерим id сохраненных
          // для корректного отображения лайка и удаления карточки
          filteredMovies = filteredMovies.map((movie) => {
            if(savedMoviesIds[movie.id] !== undefined) {
              movie._id = savedMoviesIds[movie.id];
              // console.log('Один из сохраненных фильмов для корректировки id', movie)
            }
            return movie;
          });

          // console.log('filteredMovies после использования map', filteredMovies);
          
          if(filteredMovies.length === 0) {
            setIsRequestInfo({
              isOpen: true,
              success: false,
              text: 'Ничего не найдено'
            });
            setFilteredMoviesList([]);
            // console.log('Попали в ответвление IF, где длина отфильтрованного списка равна нулю.');
          } else {
            setIsRequestInfo({
              isOpen: false,
              success: true,
              text: ''
            });
            // console.log('Попали в ответвление IF, где длина отфильтрованного списка НЕ равна нулю.');
            // console.log('Отфильтрованный список: ', filteredMovies);
            setFilteredMoviesList(filteredMovies);
          }
        } else {
          // console.log('Попали в блок ELSE проверки наличия файла с параметрами поиска (параметры отсутствуют).');
          localStorage.setItem("filteredMoviesList", []);
          setFilteredMoviesList([]);
        }
      })
      .catch(() => {
        setIsRequestInfo({
          isOpen: true,
          success: false,
          text: `Во время запроса filterMovieList произошла ошибка. Возможно, проблема 
            с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`
        })
      })
      .finally(() => setIsLoading(false));
    }
  }

  // при нажатии на кнопку найти на странице "Фильмы"
  function onSubmitSearch(values) {
    if (values.film) {
      localStorage.setItem("filterParams", JSON.stringify(values));
      filterMovieList();
    }
  }

  // при нажатии на кнопку найти на странице "Сохраненные фильмы"
  function onSubmitSearchSaved(values) {
    filterSavedMovies(values);
  }

  // все для регистрации, авторизации, форм Логина, Регистрации и Профиля

  function tokenCheck() {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      // setIsLoader(true);
      api.checkToken(jwt)
        .then((res) => {
          setCurrentUser(res.user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log("Ошибка:" + err);
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        })
        // .finally(() => setIsLoader(false));
    } else {
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("filterParams");
    localStorage.removeItem("movieList");
    localStorage.removeItem("filteredMoviesList");
    setFilteredMoviesList([]);
    setCurrentUser({});
    navigate("/");
  }

  function handleBurgerClick() {
    setIsBurgerOpened(!isBurgerOpened);
  }

  function handleLogin(values) {

    api.login(values)
      .then(() => {
        const jwt = localStorage.getItem("token");
        api.getUserInfo(jwt)
          .then((data) => {
            setCurrentUser(data.user);
            setIsLoggedIn(true);
            navigate("/movies");
          })
          .catch((err) => {
            setIsRequestInfo({
              isOpen: true,
              text: err});
          })
      })
      .catch((err) => {
        setIsRequestInfo({
          isOpen: true,
          success: false,
          text: err});
      })
  }

  function handleRegister(values) {
    api.register(values)
    .then(() => {
      handleLogin(values);
    })
    .catch((err) => {
      setIsRequestInfo({
        isOpen: true,
        success: false,
        text: err});
    })
  }

  function handleEditUser(values) {
    const jwt = localStorage.getItem("token");
    api.sendUserInfo(values, jwt)
      .then((data) => {
        setCurrentUser(data.user);
        setIsRequestInfo({
          isOpen: true,
          success: true,
          text: 'Данные пользователя успешно изменены'});
      })
      .catch((err) => {
        setIsRequestInfo({
          isOpen: true,
          success: false,
          text: err});
      })
  }

  return(
    <div className="app">
      {
      // isLoading ? (
      //   <Preloader />
      // ) : 
      (
        <CurrentUserContext.Provider value={currentUser}>
          <Header 
            loggedIn={isLoggedIn}
            handleBurgerClick={handleBurgerClick}
            isBurgerOpened={isBurgerOpened}
          />
          <Routes>
            <Route exact path='/' element={<Main />} />
            <Route path="/signup" 
              element={
                !isLoggedIn ? 
                  <Register 
                    isRequestInfo={isRequestInfo} 
                    setIsRequestInfo={setIsRequestInfo}
                    onRegister={handleRegister}
                  /> : 
                  <Navigate to="/" />} 
            />
            <Route path="/signin" 
              element={
                !isLoggedIn ? 
                  <Login 
                    isRequestInfo={isRequestInfo} 
                    setIsRequestInfo={setIsRequestInfo}
                    onLogin={handleLogin}
                  /> : 
                  <Navigate to="/" />} 
            />
            <Route path="/movies"
              element={
                <ProtectedRoute 
                  element={Movies}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  getMovieList={getMovieList}
                  onSubmitSearch={onSubmitSearch}
                  filteredMoviesList={filteredMoviesList}
                  filterMovieList={filterMovieList}
                  renderSavedMoviesIds={renderSavedMoviesIds}
                  onClickLike={onClickLike}
                  isRequestInfo={isRequestInfo} 
                  setIsRequestInfo={setIsRequestInfo}
                />}
            />
            <Route path="/saved-movies"
              element={
                <ProtectedRoute 
                  element={SavedMovies}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  onClickLike={onClickLike}
                  onSubmitSearch={onSubmitSearchSaved}
                  isRequestInfo={isRequestInfo}
                  setIsRequestInfo={setIsRequestInfo}
                  savedMoviesList={savedMoviesList}
                  filterSavedMovies={filterSavedMovies}
                />}
            />
            <Route path="/profile"
              element={
                <ProtectedRoute 
                  element={Profile}
                  isLoggedIn={isLoggedIn}
                  handleSignOut={handleSignOut}
                  handleEditUser={handleEditUser}
                  isRequestInfo={isRequestInfo} 
                  setIsRequestInfo={setIsRequestInfo}
                />
            }
            />
            <Route path="/*" element={<NotFound />}>
            </Route>
          </Routes>
          <Footer />
      </CurrentUserContext.Provider>
      )}
    </div>
  );
}
