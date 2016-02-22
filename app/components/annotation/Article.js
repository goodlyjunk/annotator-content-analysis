import React from 'react';
import AppStore from 'store/appStore';
import { ADD_HIGHLIGHT } from 'actions/actionTypes';

export default React.createClass({
  displayName: 'Article',

  contextTypes: {
    params: React.PropTypes.object.isRequired
  },

  propTypes: {
    article: React.PropTypes.object.isRequired,
    topics: React.PropTypes.array.isRequired
  },

  handleClick: function() {
    var selectionObj = window.getSelection();
    if (selectionObj) {
      console.log(selectionObj);
      // does this kind of data munging belong in a reducer?
      let selectedText = selectionObj.toString();
      let start = domRoot.textContent.indexOf(selectedText);
      let end = start + selectedText.length;
      store.dispatch({ type: ADD_HIGHLIGHT,
                       selection: { start, end, selectedText } });
    }
  },

  render() {
    const {topic_id}: string = this.context.params
    let article = this.props.article;
    let topic = this.props.topics[topic_id];

    return (
      <div>
        <div className='tua__header-text'>
          Focus on the bold text about '{topic.name}' and answer the questions.
        </div>
        <div className='article'>{article.text}</div>
      </div>
    );
  }

});
