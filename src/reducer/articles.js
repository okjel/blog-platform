import actionTypes from '../actions/actionTypes';

const initialState = {
  items: [],
  single: { title: '', tagList: [], author: {} },
  articlesCount: 0,
  isLoading: true,
  isError: false,
};

export default function articles(state = initialState, action) {
  switch (action.type) {
    case actionTypes.pushArticles:
      return {
        ...state,
        items: [...action.payload.articles],
        articlesCount: action.payload.articlesCount,
      };

    case actionTypes.setArticleSingle:
      return {
        ...state,
        single: { ...action.payload },
      };

    case actionTypes.setIsError:
      return { ...state, isError: action.payload };

    case actionTypes.setIsLoading:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
}
