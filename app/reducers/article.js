// import api from '../api.js';

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
  highlights: [],
  currentTopic: "none",
  curArticle: null
}, getInitialState());

export function article(state = initialState, action) {
  switch (action.type) {
    case 'ACTIVATE_TOPIC':
      return Object.assign({}, state, { currentTopic: action.topic });
    case 'GET_ARTICLE':
      return {
        ...state,
        curArticle: Number(action.articleId)
      }
    default:
      return state;
  }
}
