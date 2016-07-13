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

/*<Highlight
text={this.props.article.text} //Hard copy of text that goes unchanged
topics={this.props.topics} //Using to adapt merge-colors properly
currentTopic={this.props.currentTopic} //Needs current from outside
/>*/

/*<div ref={(ref) => this.articleRef = ref} id='article-container' className='article' onClick={this.handleClick}>
  {Array(highlights.length * 2).fill().map((_,i) => {
    var curHL = highlights[i / 2 | 0];
    if (i % 2 === 0) {
      // render normal text
      return (<span key={i}>{text.substring(start, curHL.start)}</span>);

      // could render a highlight component here
    } else {
      // render highlight
      start = curHL.end;
      return (<span key={i}
                    //className={'highlighted topic' + curHL.topic}
                    source = {curHL.source}
                    onClick={this.handleSelect.bind(this, curHL.source)}
                    style={{backgroundColor: this.mergeColors(curHL.topics, curHL.selected)}}
              >{text.substring(curHL.start, curHL.end)}</span>);
    }
  })}
  { tail }
</div>*/

export default connect(
  mapStateToProps,
  null
  //mapDispatchToProps
)(Article);
