import { ADD_HIGHLIGHT,
        DELETE_HIGHLIGHT,
        SELECT_HIGHLIGHT,
         NEW_ARTICLE,
         ACTIVATE_TOPIC } from '../actions/actionTypes';
import api from '../api.js';

// Note: not 100% sure this is the 'proper' reducer layout - we'll find out more
// as we go

function getInitialState() {
  return { articles: api.getArticles() };
}

const initialState = Object.assign({
  articles: [],
  highlights: [],
  selectedHighlight: [],
  // TODO: somehow track what the user's seen in their sessions not just count
  curArticle: 0,
}, getInitialState());

function mergeHighlights(list) {
  // TODO: write tests for me

  //Adding case for multiple classes on text
  //list sorted based on beginnings,
  //to check if end of first is greater than beginning of next
  // is guaranteed to overlap

  var newlist = [];
  var n = list.length;
  for (var i = 0; i < n;) {
    var newrange = Object.assign({}, list[i]);
    //Going through all the highlights
    for (var j = i + 1; j < n; j++) {
      //Merge if same topic
      if ((list[i].end >= list[j].start) && (list[i].topic === list[j].topic)) {
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

// Function that takes a list of rgb colors and returns a new average color
// When overlap detected (i.e. two classes detected), color replaced

//WHAT: Deals with highlights, Generating aritcles, and Activating Topics
//TODO ADD_HIGHLIGHT:
// - option to delete highlights
// - be able to support overlapping highlights
export default function articleReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_HIGHLIGHT:
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
    case NEW_ARTICLE:
      api.sendHighlights(state.highlights);
      if (!action.article || action.article >= state.articles.length) {
        return Object.assign({}, state, { articles: api.getArticles(),
                                          highlights: [],
                                          curArticle: 0 });
      }
      return Object.assign({}, state, { highlights: [],
                                      curArticle: state.curArticle + 1,});
    case ACTIVATE_TOPIC:
      return Object.assign({}, state, { currentTopic: action.topic });
    case SELECT_HIGHLIGHT:
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
    case DELETE_HIGHLIGHT:
      /*Remove selected highlights in state.highlights using the
      indices from selectedHighlights. Also reset selectedHighlights*/
      var new_state = state.highlights;
      var new_list = [];
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
          new_list.push(s_h);
        }
        stateindex += 1;
      }
      return Object.assign({}, state, { highlights: new_list, selectedHighlight: []});
    default:
      return state;
  }
}
