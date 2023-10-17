class MoviesApi {
  constructor({ baseUrl, headers, credentials}) {
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

  getMovies() {
    return this._request('/beatfilm-movies', { method: 'GET', credentials: this._credentials, headers: this._headers})
      .then(res => {
        const movieList = JSON.stringify(res);
        localStorage.setItem('movieList', movieList);
        return res;
      })
  }
}

const beatApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co',
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export { beatApi }