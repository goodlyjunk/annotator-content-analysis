import { TEST_ACTION } from '../actions/actionTypes';

const initialState = {
  exampleProp: 'defaultValue'
}

export default function reducerExample(state = initialState, action) {
  switch (action.type) {
    case TEST_ACTION:
      return Object.assign({}, state, { exampleProp: action.text });
    default:
      return state;
  }
}
