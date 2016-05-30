import { combineReducers } from 'redux';
import annotationReducers from './annotationReducers';
import quizReducers from './quizReducers';

const rootReducer = combineReducers({
  annotationReducers,
  quizReducers
});

export default rootReducer;
