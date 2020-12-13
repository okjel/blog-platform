import actionTypes from '../actions/actionTypes';
import LocalStorageService from '../services/LocalStorageService';

const localStorageUser = LocalStorageService.getUser();

const user = localStorageUser
  ? localStorageUser.user
  : {
      id: null,
      email: null,
      username: null,
      bio: null,
      image: null,
      token: null,
    };

const initialState = {
  user,
  error: {},
  isLogIn: user.id !== null,
  isLoading: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case actionTypes.setUser:
      return {
        ...state,
        user: { ...action.payload.user },
        isLogIn: true,
      };

    case actionTypes.setIsLoadingAuth:
      return { ...state, isLoading: action.payload, error: {} };

    case actionTypes.setErrorAuth:
      return { ...state, isLoading: false, error: action.payload };

    case actionTypes.logOut:
      return { ...state, isLogIn: false, error: {}, user };

    default:
      return state;
  }
}
