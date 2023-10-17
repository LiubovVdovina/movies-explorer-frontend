class Api {
  constructor({ baseUrl, credentials, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._credentials = credentials;
  }

  async _checkResponse(res) {
    const result = await res.json();
    return res.ok ? result : Promise.reject(result.message);
  }

  _request(url, { method, headers, body }) {
    return fetch(`${this._baseUrl}${url}`, {
      method,
      headers,
      body
    })
    .then(this._checkResponse)
  }

  register({name, password, email}) {
    return this._request('/signup', { method: 'POST', credentials: this._credentials, headers: this._headers, body: JSON.stringify({ name, password, email })})
  }

  login({ password, email }) {
    return this._request('/signin', { method: 'POST', credentials: this._credentials, headers: this._headers, body: JSON.stringify({ password, email }) })
      .then(res=> {localStorage.setItem('token', res.token)});
  }

  checkToken(jwt) {
    return this._request('/users/me', { method: 'GET', credentials: this._credentials, headers: {...this._headers, 'Authorization': `Bearer ${jwt}`} })
  }

  getUserInfo(jwt) {
    return this._request('/users/me', { method: 'GET', credentials: this._credentials, headers: {...this._headers, 'Authorization': `Bearer ${jwt}`} });
  }

  sendUserInfo({ name, email }, jwt) {
    return this._request('/users/me', { method: 'PATCH', credentials: this._credentials, headers: {...this._headers, 'Authorization': `Bearer ${jwt}`}, body: JSON.stringify({ name, email })});
  }

  getSavedMovies(jwt) {
    // console.log('Делаем запрос к апи getSavedMovies');
    return this._request(
      '/movies', 
      {
        method: 'GET', 
        credentials: this._credentials, 
        headers: {
          ...this._headers, 
          'Authorization': `Bearer ${jwt}`
        }
      }
    )
    .then(res => res.movies)
  }

  postSavedMovie(movie, jwt) {
    // console.log('postSavedMovie получил следующий объект фильма:', movie);
    // const test = {
    //     country: movie.country,
    //     director: movie.director,
    //     duration: movie.duration,
    //     description: movie.description,
    //     image: `https://api.nomoreparties.co${movie.image.url}`,
    //     trailerLink: movie.trailerLink,
    //     nameRU: movie.nameRU,
    //     nameEN: movie.nameEN,
    //     thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
    //     movieId: movie.id
    // }
    // console.log('Отправляем следующие данные: ', test);
    return this._request(
      '/movies', 
      {
        method: 'POST', 
        credentials: this._credentials, 
        headers: {
          ...this._headers, 
          'Authorization': `Bearer ${jwt}`}, 
          body: JSON.stringify({ 
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            description: movie.description,
            image: `https://api.nomoreparties.co${movie.image.url}`,
            trailerLink: movie.trailerLink,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
            movieId: movie.id
          })
      }
    );
  }

  
  deleteSavedMovie(movieId, jwt) {
    return this._request(
      `/movies/${movieId}`, 
      {
        method: 'DELETE', 
        credentials: this._credentials, 
        headers: {
          ...this._headers, 
          'Authorization': `Bearer ${jwt}`
        }
      }
    );
  }
}

const api = new Api({
  baseUrl: 'https://api.movielife.nomoredomainsrocks.ru',
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export {api, Api}