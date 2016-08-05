import React from 'react';
import { addHighlight, deleteHighlight, selectHighlight } from 'actions/article';
import { connect } from 'react-redux';
import jquery from 'jquery';
import './styles.scss';
import HighlightModule from 'components/highlight/highlight';
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

  serializeData: function() {
    return this.props.Highlight.highlights;
  },
  render() {
    console.log('article')
    var colors =['rgb(241, 96, 97)', 'rgb(253, 212, 132)', 'rgb(175, 215, 146)', 'rgb(168, 210, 191)', 'rgb(255,153,000)', 'rgb(102,000,153)', 'rgb(000,153,153)', 'rgb(255,102,255)', 'rgb(000,051,153)', 'rgb(153,000,204)', 'rgb(70,194,64)', 'rgb(94,242,188)'];
    return (
      <div className='article'>
        <div className='tua__header-text'>
          Focus on the bold text about FOO and answer the questions.
        </div>
        <div id='article-container' className='article'>
        <HighlightModule
        colors={colors}
        text={this.props.article.text} //Hard copy of text that goes unchanged
        topics={this.props.topics} //Using to adapt merge-colors properly
        currentTopic={this.props.currentTopic} //Needs current from outside
        />
        </div>
      </div>
    );
  }
});

export default connect(
  mapStateToProps,
  null
  //mapDispatchToProps
)(Article);
