import LocalStorageService from './LocalStorageService';
import notificationError from '../shared/notification';

export const reqType = {
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
};

export const optionsCreator = (type, body) => {
  if (type === reqType.post || type === reqType.put) {
    const options = {
      method: type,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };
    if (body) options.body = JSON.stringify(body);
    return options;
  }

  return {
    method: type,
    headers: {},
  };
};

class ConduitApiService {
  constructor() {
    try {
      ConduitApiService.token = LocalStorageService.getToken();
    } catch (err) {
      notificationError(err.message);
    }
  }

  static token;

  base = 'https://conduit.productionready.io/api/';

  request = async (query, opts = optionsCreator()) => {
    const options = opts;
    if (ConduitApiService.token) options.headers.Authorization = `Token ${ConduitApiService.token}`;

    const res = await fetch(`${this.base}${query}`, options);
    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    return data;
  };
}

export default new ConduitApiService();
