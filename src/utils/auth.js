import { getItem, setItem, removeItem } from './storage';

const AUTH_KEY = 'auth';

class Auth {
  constructor() {
    this.data = getItem(AUTH_KEY);
  }

  isAuth() {
    return !!(this.getToken());
  }

  getToken() {
    return this.data;
  }

  setAuth(data) {
    this.data = data;
    setItem(AUTH_KEY, data);
  }

  logout () {
    this.data = null;
    removeItem(AUTH_KEY);
  }
}

export default new Auth();
