import actionTypes from '../actions/actionTypes';

const initialState = {
  items: [],
  single: { title: '', tagList: [], author: {}, createdAt: 0 },
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
        single: { ...action.payload },
      };

    case actionTypes.setIsError:
      return { ...state, isError: action.payload };

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
        single:
          state.single.slug === action.payload.slug
            ? {
                ...state.single,
                favorited: !state.single.favorited,
                favoritesCount: state.single.favorited
                  ? state.single.favoritesCount - 1
                  : +state.single.favoritesCount + 1,
              }
            : state.single,
      };

    default:
      return state;
  }
}
