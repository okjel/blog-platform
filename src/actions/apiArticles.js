import { notification } from 'antd';
import actionTypes from './actionTypes';
import ArticleService from '../services/ArticleService';
import notificationError from '../shared/notification';

export const setIsError = () => {
  notificationError();
  return { type: actionTypes.setIsError, payload: true };
};

export const setIsLoading = (value) => ({ type: actionTypes.setIsLoading, payload: value });

export const setFavorite = (value) => ({ type: actionTypes.setFavorite, payload: value });

export const getArticles = (offset = 0) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await ArticleService.getArticles(offset);
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
    const response = await ArticleService.getArticleSingle(id);
    dispatch({ type: actionTypes.setArticleSingle, payload: response.article });
    dispatch(setIsLoading(false));
  } catch {
    dispatch(setIsError());
    setTimeout(() => getArticleSingle(id), 2000);
  }
};

export const createArticle = (data) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    await ArticleService.createArticle(data);
    dispatch(setIsLoading(false));
    notification.success({
      message: 'Статья создана',
    });
  } catch {
    dispatch(setIsError());
    setTimeout(() => createArticle(data), 2000);
  }
};

export const editArticle = (data, slug) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    await ArticleService.editArticle(data, slug);
    dispatch(setIsLoading(false));
    notification.success({
      message: 'Статья обновлена',
    });
  } catch {
    dispatch(setIsError());
    setTimeout(() => editArticle(data), 2000);
  }
};

export const deleteArticle = (slug) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    await ArticleService.deleteArticle(slug);
    dispatch(setIsLoading(false));
    notification.success({
      message: 'Статья удалена',
    });
  } catch {
    dispatch(setIsError());
    setTimeout(() => deleteArticle(slug), 2000);
  }
};

export const toggleFavorite = (slug, value) => async (dispatch) => {
  try {
    dispatch(setFavorite({ slug }));
    if (value) await ArticleService.unFavoriteArticle(slug);
    if (!value) await ArticleService.favoriteArticle(slug);
  } catch {
    dispatch(setIsError());
    setTimeout(() => toggleFavorite(slug, value), 2000);
  }
};
