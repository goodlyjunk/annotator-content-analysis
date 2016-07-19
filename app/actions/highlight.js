export const ADD_HIGHLIGHT = 'ADD_HIGHLIGHT';
export const DELETE_HIGHLIGHT = 'DELETE_HIGHLIGHT';
export const SELECT_HIGHLIGHT = 'SELECT_HIGHLIGHT';

export function addHighlight(start, end, selectedText, currentTopic) {// NOTE:
  return { type: ADD_HIGHLIGHT, selection: {start, end, selectedText, currentTopic} };
}

export function deleteHighlight(source) {
  return { type: DELETE_HIGHLIGHT, highlights: source };
}

export function selectHighlight(source) {
  return { type: SELECT_HIGHLIGHT, highlights: source };
}
