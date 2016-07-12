import { ADD_HIGHLIGHT,
         DELETE_HIGHLIGHT,
         NEW_ARTICLE,
         ACTIVATE_TOPIC } from '../actions/actionTypes';
import articleJsonMock_0 from '../assets/article_0_mock.json';
import articleJsonMock_9 from '../assets/article_9_mock.json';
import topicJsonMock from '../assets/topic_0_mock.json';

// NOTE: create mock article routes at `/topics/0` and `/topics/9`
var articleMock = new Array(9)
articleMock[0] = articleJsonMock_0
articleMock[9] = articleJsonMock_9

function getInitialState() {
  return {
    articles: articleMock,
    topics: topicJsonMock.results
  };
}

const initialState = Object.assign({
  article: [],
  topics: [],
  highlights: [],
  selectedHighlight: [],
  curArticle: null
}, getInitialState());

function mergeHighlights(list) {
  // TODO: write tests for me
  var newlist = [];
  var n = list.length;
  for (var i = 0; i < n;) {
    var newrange = Object.assign({}, list[i]);
    for (var j = i + 1; j < n; j++) {
      if ((list[i].end >= list[j].start) && (list[i].topic === list[j].topic)) {
        newrange.text += list[j].text.substring(
          Math.min(newrange.end, list[j].end) - list[j].start, list[j].text.length
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

export function article(state = initialState, action) {
  switch (action.type) {
    case 'ADD_HIGHLIGHT':
      var newHighlights = state.highlights.concat(
        { start: action.selection.start,
          end: action.selection.end,
          text: action.selection.selectedText,
          topic: state.currentTopic }
      ).sort((a,b) => {
        if (a.start === b.start) {
          return 0;
        } else if (a.start < b.start) {
          return -1;
        } else {
          return 1;
        }
      });
      return Object.assign({}, state,
                           { highlights: mergeHighlights(newHighlights) });
    // case NEW_ARTICLE:
    //   api.sendHighlights(state.highlights);
    //   if (!action.article || action.article >= state.articles.length) {
    //     return Object.assign({}, state, { articles: api.getArticles(),
    //                                       highlights: [],
    //                                       curArticle: 0 });
    //   }
    //   return Object.assign({}, state, { highlights: [],
    //                                     curArticle: state.curArticle + 1 });
    case 'ACTIVATE_TOPIC':
      return Object.assign({}, state, { currentTopic: action.topic });
    case 'SELECT_HIGHLIGHT':
      /*Add start-end indices of clicked span to selectedHighlights
      The indices are used in render to 'select' and darken the span*/
      var select = action.highlights;
      var indices = [];
      var i = 0;
      while (i < select.length) {
        var start = select[i].start;
        var end = select[i].end;
        indices.push([start, end])
        i += 1;
      }
      return Object.assign({}, state, { selectedHighlight: indices });
    case 'DELETE_HIGHLIGHT':
      /*Remove selected highlights in state.highlights using the
      indices from selectedHighlights. Also reset selectedHighlights*/
      var new_state = [];
      var indices = [];
      var stateindex = 0;
      while (stateindex < state.highlights.length) {
        var actionindex = 0;
        var pushbool = true;
        while (actionindex < action.highlights.length) {
          var a_h = action.highlights[actionindex];
          // Highlight to be deleted
          var s_h = state.highlights[stateindex];
          //Current highlights
          if (a_h[0] == s_h.start && a_h[1] == s_h.end){
            pushbool = false;
          }
          actionindex += 1;
        }
        if (pushbool) {
          new_state.push(s_h);
        }
        stateindex += 1;
      }
      return Object.assign({}, state, { highlights: new_state, selectedHighlight: []});
    case 'GET_ARTICLE':
      return {
        ...state,
        curArticle: Number(action.articleId)
      }
    default:
      return state;
  }
}
