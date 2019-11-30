import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './users';

const reducer = combineReducers({user});
// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({collapsed: true})),
// );
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export * from './users';
