import { ADD_HIGHLIGHT,
         NEW_ARTICLE,
         ACTIVATE_TOPIC } from '../actions/actionTypes';
import api from '../api.js';

// Note: not 100% sure this is the 'proper' reducer layout - we'll find out more
// as we go

const initialState = {
  article: {
    articles: api.getArticles(),
    // TODO: somehow track what the user's seen in their sessions not just count
    curArticle: 0,
    highlights: []
  },
  topic: {
    currentTopic: 0,
    topics: []
  }
}

console.log('initstate of article reducer', initialState);

function mergeHighlights(list) {
  // TODO: write tests for me
  var newlist = [];
  var n = list.length;
  for (var i = 0; i < n;) {
    var newrange = Object.assign({}, list[i]);
    for (var j = i + 1; j < n; j++) {
      if (list[i].end >= list[j].start) {
        newrange.text += list[j].text.substring(
          Math.min(newrange.end, list[j].end) - list[j].start, list[j].end
        );
        newrange.end = Math.max(list[j].end, newrange.end);
        continue;
      } else {
        break;
      }
    }
    i = j;
    newlist.push(newrange);
  }
  return newlist;
}

function topic(state = {}, action) {
  switch (action.type) {
    case ACTIVATE_TOPIC:
      return Object.assign({}, state, { currentTopic: action.topic });
    default:
      return state;
  }
}

export default function articleReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_HIGHLIGHT:
      var newHighlights = state.article.highlights.concat(
        { start: action.selection.start,
          end: action.selection.end,
          text: action.selection.selectedText,
          topic: state.topic.currentTopic }
      ).sort((a,b) => {
        if (a.start === b.start) {
          return 0;
        } else if (a.start < b.start) {
          return -1;
        } else {
          return 1;
        }
      });
      return Object.assign({}, state, { article: {
                             highlights: mergeHighlights(newHighlights)
                           }});
    case NEW_ARTICLE:
      api.sendHighlights(state.article.highlights);
      if (!action.article || action.article >= state.article.articles.length) {
        return Object.assign({}, state, { article: { articles: api.getArticles(),
                                                     highlights: [],
                                                     curArticle: 0 }});
      }
      return Object.assign({}, state, { article: { highlights: [],
                                                   curArticle: state.article.curArticle + 1 }});
    default:
      return state;
  }
}
