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
      var newHighlights = state.highlights.concat(
        { start: action.selection.start,
          end: action.selection.end,
          text: action.selection.selectedText }
      ).sort((a,b) => {
        if (a.start === b.start) {
          return 0;
        } else if (a.start < b.start) {
          return -1;
        } else {
          return 1;
        }
      });
      console.log(newHighlights);
      return Object.assign({}, state, { highlights: newHighlights });
    default:
      return state;
  }
}
