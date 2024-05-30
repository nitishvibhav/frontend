
import { createStore } from 'redux';
import combineReducers from './reducers';
import middleware from './middleware';

const store = createStore(combineReducers, middleware);

export default store;
