class LocalStorageService {
  USER = 'user';

  getUser = () => {
    try {
      const raw = localStorage.getItem(this.USER);
      const parse = JSON.parse(raw);
      return parse
        ? parse.user
        : {
            id: null,
            email: null,
            username: null,
            bio: null,
            image: null,
            token: null,
          };
    } catch {
      throw Error('Не удалось получить данные пользователя из хранилища');
    }
  };

  getToken = () => {
    try {
      return this.getUser().token;
    } catch {
      throw Error('Не удалось получить токен из хранилища');
    }
  };

  setUser = (user) => {
    localStorage.setItem(this.USER, JSON.stringify(user));
  };

  clear = () => {
    localStorage.clear();
  };
}

export default new LocalStorageService();
