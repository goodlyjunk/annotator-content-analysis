import { ADD_HIGHLIGHT, TEST_ACTION } from '../actions/actionTypes';

const initialState = {
  exampleProp: 'defaultValue',
  highlights: []
}

export default function articleReducer(state = initialState, action) {
  switch (action.type) {
    case TEST_ACTION:
      return Object.assign({}, state, { exampleProp: action.text });
    case ADD_HIGHLIGHT:
      console.log(action);
      var newHighlights = state.highlights.concat(
        { start: action.selection.start,
          end: action.selection.end,
          text: action.selection.selectedText }
      );
      return Object.assign({}, state, { highlights: newHighlights });
    default:
      return state;
  }
}
