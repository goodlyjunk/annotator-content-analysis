import React from 'react';
import { ADD_HIGHLIGHT } from 'actions/actionTypes';
import { connect } from 'react-redux';

const Article = React.createClass({
  displayName: 'Article',

  contextTypes: {
    params: React.PropTypes.object.isRequired
  },

  propTypes: {
    article: React.PropTypes.object.isRequired,
    topics: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.function
  },

  handleClick: function() {
    var selectionObj = window.getSelection();
    if (selectionObj) {
      // does this kind of data munging belong in a reducer?
      let selectedText = selectionObj.toString();
      let start = this.articleRef.textContent.indexOf(selectedText);
      let end = start + selectedText.length;
      this.props.dispatch({ type: ADD_HIGHLIGHT,
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
        <div ref={(ref) => this.articleRef = ref} className='article' onClick={this.handleClick}>{article.text}</div>
      </div>
    );
  }

});

export default connect()(Article);
