import ConduitApiService, { optionsCreator, reqType } from './ConduitApiService';

class AuthService {
  signUp = async (username, email, password) => {
    const path = 'users';
    const body = {
      user: {
        username,
        email,
        password,
      },
    };

    const options = optionsCreator(reqType.post, body);

    const response = await ConduitApiService.request(path, options);
    ConduitApiService.token = response.user.token;
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

    const options = optionsCreator(reqType.post, body);

    const response = await ConduitApiService.request(path, options);
    ConduitApiService.token = response.user.token;
    return response;
  };

  editProfile = (data) => {
    const path = 'user';
    const body = {
      user: data,
    };

    const options = optionsCreator(reqType.put, body);
    return ConduitApiService.request(path, options);
  };
}

export default new AuthService();
