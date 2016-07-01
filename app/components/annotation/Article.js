import React from 'react';
import { addHighlight } from 'actions/actions';
import { connect } from 'react-redux';
import jquery from 'jquery';

import 'Article.scss';

const mapDispatchToProps = dispatch => {
  return {
    onHighlight: (start, end, selectedText) => {
      dispatch(addHighlight(start, end, selectedText));
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
    highlights: React.PropTypes.array,
    currentTopic: React.PropTypes.string
  },

  /*
  Domain: current stored highlight objects
  Range: highlight-like objects that describe each text span

  1. Takes the current highlights and breaks each into a start and end object,
  2. sorts the objects by their index in the text,
  3. creates a new highlight-like object for each segment between objects. These
  objects will describe the spans that the render function creates. Each will have
  its own combination of topics according to its overlap,
  4. activates or deactivates topics based on whether the object describes the
  start of a highlight or the end of one
  5. returns a list of span-objects with the same properties as highlight, which is passed
  into render.

  No alterations were made to render or to the article reducer - all
  this method does is reinterpret stored highlights so that render returns
  distinct spans that appear to be overlapping
  */
  processHighlights: function(highlights) {
    var parsedHighlights = [];
    var final = [];
    var temp_index = 0;
    var beginning = {type: 'start', index: 0, topic: [], source: []};
    parsedHighlights.push(beginning);
    while (temp_index < highlights.length) {
      var i = highlights[temp_index];
      var start = {type: 'start', index: i.start, topic: i.topic, source: i};
      var end = {type: 'end', index: i.end, topic: i.topic, source: i};
      parsedHighlights.push(start);
      parsedHighlights.push(end);
      temp_index += 1;
    }
    parsedHighlights.sort((a,b) => {
      return a.index - b.index;
    });
    var activeSources = [];
    var activeTopics = [false, false, false, false];
    var topic_list = ['topic1', 'topic2', 'topic3', 'topic4'];
    var start = 0;
    var end = 0;
    temp_index = 0;
    while (temp_index < parsedHighlights.length) {
      var i = parsedHighlights[temp_index];
      var processed = {start: null, end: null, topics: [], source: []};
      processed.start = start;
      processed.end = i.index;
      start = i.index;
      processed.source = activeSources;
      var list_index = 0;
      while (list_index < activeTopics.length) {
        if (activeTopics[list_index]) {
          processed.topics.push(topic_list[list_index]);
        }
        list_index += 1;
      }
      final.push(processed);
      var active_state = i.type === 'start'
      if (i.topic === '1') {
        activeTopics[0] = active_state;
      } else if (i.topic === '2') {
        activeTopics[1] = active_state;
      } else if (i.topic === '3') {
        activeTopics[2] = active_state;
      } else if (i.topic === '4') {
        activeTopics[3] = active_state;
      }
      temp_index += 1;
    }
    return final;
  },
  /*
  Domain: List of Topics
  Range: String RGB

  From list of topics, gathers
  */
  mergeColors: function(topics) {
    var list = [];
    var index = 0;
    while (index < topics.length) {
      switch (topics[index]) {
        case ('topic1'):
          list.push('rgb(241, 96, 97)');
          break;
        case ('topic2'):
          list.push('rgb(253, 212, 132)');
          break;
        case ('topic3'):
          list.push('rgb(175, 215, 146)');
          break;
        case ('topic4'):
          list.push('rgb(168, 210, 191)');
          break;
      }
      index = index + 1;
    }
    var fraction = 1 / list.length;
    var red = 0;
    var blue = 0;
    var green = 0;
    index = 0;
    while (index < list.length) {
      var rgb = list[index].replace(/[^\d,]/g, '').split(',');
      red += fraction * Number(rgb[0]);
      green += fraction * Number(rgb[1]);
      blue += fraction * Number(rgb[2]);
      index+=1;
    }
    if (list.length == 0) {
      return 'rgb(255, 255, 255)';
    }
    return 'rgb(' + Math.round(red) + ', ' + Math.round(green) + ', ' + Math.round(blue) +' )';
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

  render() {
    const {topic_id}: string = this.context.params
    let topic = this.props.topics[topic_id];

    var text = this.props.article.text;
    /* replace this.props.article with processHighlights(this.props.highlights)*/
    /*var highlights = this.props.highlights || [];*/
    var highlights = this.processHighlights(this.props.highlights) || [];

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
          {Array(highlights.length * 2).fill().map((_,i) => {
            var curHL = highlights[i / 2 | 0];
            if (i % 2 === 0) {
              // render normal text
              return (<span key={i}>{text.substring(start, curHL.start)}</span>);
            } else {
              // render highlight
              // Pass in source highlight objects
              // add color here from topics
              start = curHL.end;
              return (<span key={i}

                            style={{backgroundColor: this.mergeColors(curHL.topics)}}
                            source={curHL.source}
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
