import { NEW_QUESTIONS, UPDATE_ANSWER } from '../actions/actionTypes';
import tmpQuestions from '../assets/tmpQuestions.json';

const initialState = {
  questions: tmpQuestions.initialQuestion
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case NEW_QUESTIONS:
      return Object.assign({}, state, { questions: action.questions });
    case UPDATE_ANSWER:
    	console.log(action.answers);
    	return Object.assign({}, state, { answers: action.answers });
    default:
      return state;
  }
}
