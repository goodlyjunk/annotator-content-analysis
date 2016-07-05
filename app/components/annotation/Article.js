import React from 'react';
import { addHighlight, deleteHighlight } from 'actions/actions';
import { connect } from 'react-redux';
import jquery from 'jquery';

import 'Article.scss';

const mapDispatchToProps = dispatch => {
  return {
    onHighlight: (start, end, selectedText) => {
      dispatch(addHighlight(start, end, selectedText));
    },
    removeHighlight: (highlight) => {
      dispatch(deleteHighlight(highlight));
    }
  };
}

const mapStateToProps = state => {
  return { highlights: state.articleReducers.highlights,
           currentTopic: state.articleReducers.currentTopic };
}

const Article = React.createClass({
  displayName: 'Article',

  contextTypes: {
    params: React.PropTypes.object.isRequired
  },

  propTypes: {
    article: React.PropTypes.object.isRequired,
    topics: React.PropTypes.array.isRequired,
    onHighlight: React.PropTypes.func,
    removeHighlight: React.PropTypes.func,
    selectedHighlight: React.PropTypes.object,
    highlights: React.PropTypes.array,
    currentTopic: React.PropTypes.string
  },

  getInitialState: function() {
    return { selectedHighlight: null };
  },

  getOffset: function(childNodes, targetNode) {
    // since we're splitting <Article> into <span>s we'll need to find which <span>
    // anchorOffset is referring to, and find that offset from the start of <Article>
    var offset = 0;
    for (var i in childNodes) {
      var childNode = childNodes[i];
      if (childNode === targetNode) {
        break;
      } else {
        offset += childNode.textContent.length;
      }
    }
    return offset;
  },

  handleClick: function() {
    var selectionObj = window.getSelection();
    if (selectionObj) {
      let selectedText = selectionObj.toString();
      let start = selectionObj.anchorOffset;
      let end = selectionObj.extentOffset;
      if (this.articleRef.childNodes.length > 1) {
        start += this.getOffset(this.articleRef.childNodes,
                                selectionObj.anchorNode.parentNode);
        end += this.getOffset(this.articleRef.childNodes,
                                selectionObj.extentNode.parentNode);
      }
      if (start > end) {
        let tmp = start;
        start = end;
        end = tmp;
      }
      if (start !== end) {
        this.props.onHighlight(start, end, selectedText);
      }
    }
  },

  componentDidMount: function() {
    // unsure if jquery is necessary to mount keypress handler
    // but this is what I found and it seems to work
    var $ = jquery;
    $(document.body).on('keydown', this.handleKeyDown);
  },

  componentWillUnmount: function() {
    var $ = jquery;
    $(document.body).off('keydown', this.handleKeyDown);
  },

  handleKeyDown: function(e) {
    if (e.keyCode === 8 || e.keyCode === 46) {
      e.preventDefault();
      if (this.state.selectedHighlight) {
        this.props.removeHighlight(this.state.selectedHighlight);
      }
    }
  },

  selectHighlight: function(highlight) {
    if (this.state.selectedHighlight
      && highlight.start === this.state.selectedHighlight.start
      && highlight.end === this.state.selectedHighlight.end) {
      this.setState({ selectedHighlight: null });
    } else {
      this.setState({ selectedHighlight: highlight });
    }
  },

  render() {
    const {topic_id}: string = this.context.params
    let topic = this.props.topics[topic_id];

    var text = this.props.article.text;
    var highlights = this.props.highlights || [];

    var start = 0;
    var tail = '';
    var l = highlights.length;

    if (l === 0) {
      tail = text;
    } else if (highlights[l - 1].end !== text.length) {
      tail = <span>{text.substring(highlights[l - 1].end, text.length)}</span>;
    }

    return (
      <div className='article'>
        <div className='tua__header-text'>
          Focus on the bold text about '{topic.name}' and answer the questions.
        </div>
        <div ref={(ref) => this.articleRef = ref} className='article' onClick={this.handleClick}>
          {Array(highlights.length * 2).fill().map((_, i) => {
            var curHL = highlights[i / 2 | 0];
            if (i % 2 === 0) {
              // render normal text
              return (<span key={i}>{text.substring(start, curHL.start)}</span>);
            } else {
              // render highlight
              // might want to create general method to check for object equality
              start = curHL.end;
              var classStr = 'highlighted';
              if (this.state.selectedHighlight
                && curHL.start === this.state.selectedHighlight.start
                && curHL.end === this.state.selectedHighlight.end) {
                classStr += ' selected' + this.state.selectedHighlight.topic;
              } else {
                classStr += ' topic' + curHL.topic;
              }

              return (<span key={i}
                            onClick={ () => { this.selectHighlight(curHL) } }
                            className={ classStr }
                      >{text.substring(curHL.start, curHL.end)}</span>);
            }
          })}
          { tail }
        </div>
      </div>
    );
  }

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
