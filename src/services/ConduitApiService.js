import LocalStorageService from './LocalStorageService';

class ConduitApiService {
  constructor() {
    const localStorageUser = LocalStorageService.getUser();
    this.token = localStorageUser ? localStorageUser.user.token : '';
  }

  base = 'https://conduit.productionready.io/api/';

  request = async (query, options) => {
    const res = await fetch(`${this.base}${query}`, options);
    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    return data;
  };

  send = (query, body, type = 'POST') => {
    const options = {
      method: type,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(body),
    };
    if (this.token) options.headers.Authorization = `Token ${this.token}`;
    return this.request(query, options);
  };

  // AUTH

  signUp = async (username, email, password) => {
    const path = 'users';
    const body = {
      user: {
        username,
        email,
        password,
      },
    };
    const response = await this.send(path, body);
    this.token = response.user.token;
    return response;
  };

  signIn = async (email, password) => {
    const path = 'users/login';
    const body = {
      user: {
        email,
        password,
      },
    };

    const response = await this.send(path, body);
    this.token = response.user.token;
    return response;
  };

  editProfile = (data) => {
    const path = 'user';
    const body = {
      user: data,
    };
    return this.send(path, body, 'PUT');
  };

  // ARTICLES

  getArticles = (offset = 0, limit = 20) => {
    const path = 'articles';
    const query = `?limit=${limit}&offset=${offset}`;
    let options = null;
    if (this.token) {
      options = {
        method: 'GET',
        headers: {
          Authorization: `Token ${this.token}`,
        },
      };
    }

    return this.request(`${path}${query}`, options);
  };

  getArticleSingle = (slug) => {
    const path = `articles/${slug}`;

    let options = null;
    if (this.token) {
      options = {
        method: 'GET',
        headers: {
          Authorization: `Token ${this.token}`,
        },
      };
    }

    return this.request(path, options);
  };

  createArticle = (data) => {
    const path = 'articles';
    return this.send(path, data);
  };

  editArticle = (data, slug) => {
    const path = `articles/${slug}`;
    return this.send(path, data, 'PUT');
  };

  deleteArticle = (slug) => {
    const path = `articles/${slug}`;
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${this.token}`,
      },
    };
    return this.request(path, options);
  };

  favoriteArticle = (slug) => {
    const path = `articles/${slug}/favorite`;
    return this.send(path);
  };

  unFavoriteArticle = (slug) => {
    const path = `articles/${slug}/favorite`;
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${this.token}`,
      },
    };
    return this.request(path, options);
  };
}

export default new ConduitApiService();
