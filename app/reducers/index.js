import { combineReducers } from 'redux';
import { article } from './article';
import { highlight } from './highlight';
import quizReducers from './quizReducers';

const rootReducer = combineReducers({
  article,
  quizReducers,
  highlight
});

export default rootReducer;
