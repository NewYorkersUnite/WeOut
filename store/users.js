const {firebaseApp, db, config} = require('../functions/util/config');
/**
 * ACTION TYPES
 */
// const GET_USER = 'GET_USER'; //LOG IN
const REMOVE_USER = 'REMOVE_USER'; //LOG OUT
const GOT_USER = 'GOT_USER'; //LOGGED IN
const ERROR = 'ERROR';

/**
 * INITIAL STATE
 */
const initialState = {
  currentUser: {},
};

/**
 * ACTION CREATORS
 */
const gotUser = user => ({type: GOT_USER, user});
const gotError = err => ({type: ERROR, err});
// const removeUser = () => ({type: REMOVE_USER});

/**
 * THUNK CREATORS
 */
export const login = (email, password) => async dispatch => {
  try {
    if (this.validateLoginData(this.state)) {
      await firebaseApp
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password);
      const usernameData = await db
        .collection('users')
        .where('email', '==', email)
        .get();
      // const username = usernameData.docs[0].data().username;
      const user = usernameData.docs[0].data();
      dispatch(gotUser(user));
    }
  } catch (error) {
    console.error(error);
    console.log('Wrong credentials, please try again', error.toString());
    dispatch(gotError(error));
  }
};

// export const logout = () => async dispatch => {
//   try {
//     await axios.post('/auth/logout');
//     dispatch(removeUser());
//     history.push('/login');
//   } catch (err) {
//     console.error(err);
//   }
// };

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_USER:
      return {...state, currentUser: action.user};
    case REMOVE_USER:
      return state;
    case ERROR:
      return {...state, error: action.error};
    default:
      return state;
  }
}
