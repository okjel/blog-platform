import actionTypes from './actionTypes';
import ConduitApiService from '../services/ConduitApiService';
import notificationError from '../components/shared/error';

export const setIsError = () => {
  notificationError();
  return { type: actionTypes.setIsError, payload: true };
};

export const setIsLoading = (value) => ({ type: actionTypes.setIsLoading, payload: value });

export const getArticles = (offset = 0) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await ConduitApiService.getArticles(offset);
    dispatch({ type: actionTypes.pushArticles, payload: response });
    dispatch(setIsLoading(false));
  } catch {
    dispatch(setIsError());
    setTimeout(() => getArticles(offset), 2000);
  }
};

export const getArticleSingle = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await ConduitApiService.getArticleSingle(id);
    dispatch({ type: actionTypes.setArticleSingle, payload: response.article });
    dispatch(setIsLoading(false));
  } catch {
    dispatch(setIsError());
    setTimeout(() => getArticleSingle(id), 2000);
  }
};
