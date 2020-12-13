class LocalStorageService {
  USER = 'user';

  getUser = () => {
    const raw = localStorage.getItem(this.USER);
    return JSON.parse(raw);
  };

  setUser = (user) => {
    localStorage.setItem(this.USER, JSON.stringify(user));
  };

  clear = () => {
    localStorage.clear();
  };
}

export default new LocalStorageService();
