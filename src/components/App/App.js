import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

import './App.css';

// импорт компонентов
import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader'

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import Login from '../Login/Login'
import Register from '../Register/Register'
import Profile from '../Profile/Profile'

import NotFound from '../NotFound/NotFound'


export default function App() {
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Виталий',
    email: 'pochta@yandex.ru'
  }); // переменная состояния, хранящая данные текущего пользователя
  const [isBurgerOpened, setIsBurgerOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  function handleBurgerClick() {
    setIsBurgerOpened(!isBurgerOpened);
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
            <Route path="/signup" element={!isLoggedIn ? <Register /> : <Navigate to="/" />} />
            <Route path="/signin" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
            <Route path="/movies"
              element={<Movies isLoading={isLoading}/>}
            />
            <Route path="/saved-movies"
              element={<SavedMovies/>}
            />
            <Route path="/profile"
              element={<Profile/>}
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
