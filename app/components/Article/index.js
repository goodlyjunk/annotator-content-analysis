import React from 'react';
import { addHighlight, deleteHighlight, selectHighlight } from 'actions/article';
import { connect } from 'react-redux';
import jquery from 'jquery';
import { styles } from './styles.scss';
import { Highlight } from 'components/highlight/highlight';
//import 'text-highlighter/src/TextHighlighter'

const mapStateToProps = state => {
  return { highlights: state.article.highlights,
           currentTopic: state.article.currentTopic,
           topics: state.article.topics
         //selectedHighlight: state.article.selectedHighlight,
       };
}

const Article = React.createClass({
  displayName: 'Article',


  propTypes: {
    article: React.PropTypes.object.isRequired,
    highlights: React.PropTypes.array,
    currentTopic: React.PropTypes.string,
  },

  componentDidMount: function() {
    let articleContainer = document.getElementById('article-container');
    /*this.annotationsObject = new TextHighlighter(articleContainer);*/
  },

  render() {
    return (
      <div className='article'>
        <div className='tua__header-text'>
          Focus on the bold text about FOO and answer the questions.
        </div>
        <div id='article-container' className='article'>
        <Highlight
        text={this.props.article.text} //Hard copy of text that goes unchanged
        topics={this.props.topics} //Using to adapt merge-colors properly
        currentTopic={this.props.currentTopic} //Needs current from outside
        selectedHighlight={[]}
        highlights={[]}
        />
        </div>
      </div>
    );
  }
});

export default connect(
  mapStateToProps,
  /*mapDispatchToProps*/
)(Article);
