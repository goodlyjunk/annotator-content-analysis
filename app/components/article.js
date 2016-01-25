import $ from 'jquery';
import React from 'react';
import AppActions from 'actions/appActions';

export default React.createClass({
  displayName: 'Article',

  propTypes: {
    article: React.PropTypes.object.isRequired
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

  render() {
    let article = this.props.article;

    return (
      <div ref={(ref) => this.articleRef = ref} className='article'>{article.text}</div>
    );
  }

});
