import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {getFirestore, reduxFirestore} from 'redux-firestore';
// import {getFirebase, reactReduxFirebase} from 'react-redux-firebase';
import thunk from 'redux-thunk';
import firebaseConfig from '../firebaseConfig';
import userReducer from './actions/users';
const reducer = combineReducers({userReducer});
const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirestore})),
    reduxFirestore(firebaseConfig),
  ),
);
export default store;
