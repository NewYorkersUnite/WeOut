import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './users';
import polls from './polls';
import events from './events';

const reducer = combineReducers({user, polls, events});
// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({collapsed: true})),
// );
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export * from './users';
export * from './polls';
export * from './events';
