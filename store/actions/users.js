const CREATED_USER = 'CREATED_USER';
const createdUser = user => {
  return {
    type: CREATED_USER,
    user,
  };
};
const initialState = {
  user: 'Nayyif',
};
export const createUser = user => {
  return async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    await firestore.collection('users').add(user);
    dispatch(createdUser(user));
  };
};
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATED_USER:
      return {...state, user: action.user};
    default:
      return state;
  }
};
