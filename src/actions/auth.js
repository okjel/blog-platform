import { notification } from 'antd';
import actionTypes from './actionTypes';
import AuthService from '../services/AuthService';
import LocalStorageService from '../services/LocalStorageService';

export const setError = (error) => {
  return { type: actionTypes.setErrorAuth, payload: error };
};

const errorHandler = (error, dispatch) => {
  dispatch(setError(error.errors || error));

  if (error.message) {
    notification.error({
      message: `Произошла ошибка: ${error.message}`,
    });
  }
};

export const setIsLoading = (value) => ({ type: actionTypes.setIsLoadingAuth, payload: value });

export const signUp = (username, email, password) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await AuthService.signUp(username, email, password);
    dispatch({ type: actionTypes.setUser, payload: response });
    LocalStorageService.setUser(response);
    dispatch(setIsLoading(false));
  } catch (error) {
    errorHandler(error, dispatch);
  }
};

export const signIn = (email, password) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await AuthService.signIn(email, password);
    dispatch({ type: actionTypes.setUser, payload: response });
    LocalStorageService.setUser(response);
    dispatch(setIsLoading(false));
  } catch (error) {
    errorHandler(error, dispatch);
  }
};

export const edit = (data) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await AuthService.editProfile(data);
    dispatch({ type: actionTypes.setUser, payload: response });
    LocalStorageService.setUser(response);
    dispatch(setIsLoading(false));
    notification.success({
      message: 'Профиль обновлён',
    });
  } catch (error) {
    errorHandler(error, dispatch);
  }
};

export const logOut = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.logOut });
    LocalStorageService.clear();
  } catch (error) {
    errorHandler(error, dispatch);
  }
};
