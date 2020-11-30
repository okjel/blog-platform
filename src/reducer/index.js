export default (state = {}, action) => {
  if (action.type === 'SET_TEST') {
    return { ...state };
  }

  return state;
};
