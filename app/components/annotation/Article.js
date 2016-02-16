import $ from 'jquery';
import React from 'react';
import AppActions from 'actions/appActions';

export default React.createClass({
  displayName: 'Article',

  contextTypes: {
    params: React.PropTypes.object.isRequired
  },

  componentDidMount() {
    const domRoot = this.articleRef;
    domRoot.addEventListener('mouseup', () => {
      AppActions.addHighlight(domRoot);
    });

    $(domRoot).on('click', '.text-span', (e) => {
      AppActions.removeHighlight(e);
    });

  },

  propTypes: {
    article: React.PropTypes.object.isRequired,
    topics: React.PropTypes.array.isRequired
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
        <div ref={(ref) => this.articleRef = ref} className='article'>{article.text}</div>
      </div>
    );
  }

});
