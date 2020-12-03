export const setError = () => ({ type: 'SET_ERROR' });

export const getAuthToken = () => async (dispatch) => {
  try {
    //
    dispatch({ type: 'GET_AUTH_TOKEN', payload: '..something..' });
  } catch {
    dispatch(setError());
  }
};
