import {createStore, combineReducers, applyMiddleware} from 'redux';
// import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
// import {composeWithDevTools} from 'redux-devtools-extension';
import users from './users';
import polls from './polls';

const reducer = combineReducers({users});
// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({collapsed: true})),
// );
const store = createStore(reducer, thunkMiddleware);

export default store;
export * from './user';
