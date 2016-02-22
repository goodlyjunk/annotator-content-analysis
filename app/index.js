import React from 'react';
import ReactDOM from 'react-dom'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistory, routeReducer } from 'react-router-redux'
import Routes from 'routes';
// theres an import syntax for folders but couldn't get it working
import reducers from 'reducers/reducers';

import App from './components/app';
import Tua from './components/annotation/Tua';
import Quiz from './components/quiz/Quiz';

import 'app.scss';

const middleware = syncHistory(browserHistory)
const reducer = combineReducers({
  ...reducers,
  routing: routeReducer
});

const finalCreateStore = compose(
  applyMiddleware(middleware)
  // DevTools.instrument()
)(createStore)
const store = finalCreateStore(reducer)
middleware.listenForReplays(store)

let elem = document.createElement('div');
elem.id = ('react-root');
document.body.appendChild(elem);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory}>
        <Route name='app' path='/app' component={App}>
          <Route
            name='tuaAnalysis'
            path='tua/:tua_id'
            component={Tua}>
            <Route
              name='topicAnalysis'
              path='topic/:topic_id'>
              <Route
                name='questionAnalysis'
                path='question/:question_id'/>
            </Route>
          </Route>
          <Route
            name='quiz'
            path='quiz'
            component={Quiz} />
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('react-root')
);
