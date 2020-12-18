import actionTypes from '../actions/actionTypes';

const initialState = {
  items: [{ title: '', tagList: [], author: {}, createdAt: 0 }],
  error: {},
  articlesCount: 0,
  isLoading: false,
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
        items: [action.payload],
      };

    case actionTypes.setIsError:
      return { ...state, isError: action.payload, isLoading: false };

    case actionTypes.setIsLoading:
      return { ...state, isLoading: action.payload };

    case actionTypes.setFavorite:
      return {
        ...state,
        items: state.items.map((item) =>
          item.slug === action.payload.slug
            ? {
                ...item,
                favorited: !item.favorited,
                favoritesCount: item.favorited ? item.favoritesCount - 1 : +item.favoritesCount + 1,
              }
            : item
        ),
      };

    default:
      return state;
  }
}
