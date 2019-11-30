const {firebaseApp, db, config} = require('../functions/util/config');

/**
 * ACTION TYPES
 */
const LOGGED_IN = 'LOGGED_IN';

/**
 * INITIAL STATE
 */
const defaultUser = {
  currentUser: {},
};

/**
 * ACTION CREATORS
 */
const logged_in = user => {
  return {type: LOGGED_IN, user};
};

/**
 * THUNK CREATORS
 */
export const login = (email, password) => async dispatch => {
  console.log('user in reducer', email);
  try {
    await firebaseApp.auth().signInWithEmailAndPassword(email, password);
    const userData = await db
      .collection('users')
      .where('email', '==', email)
      .get();
    const user = userData.docs[0].data();
    dispatch(logged_in(user));
  } catch (err) {
    console.error(err);
    console.log('Wrong credentials, please try again', err.toString());
    return {
      type: 'ERRORFROMSIGNIN',
    };
  }
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case LOGGED_IN:
      return {...state, currentUser: action.user};
    case 'ERRORFROMSIGNIN':
      return state;
    default:
      return state;
  }
}
