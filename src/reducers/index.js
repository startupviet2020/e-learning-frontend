import { combineReducers } from 'redux';
import user from './user';
import app from './app';

const rootReducer = combineReducers({
  app,
  user
});

export default rootReducer;