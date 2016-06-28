import React from 'react';
import { addHighlight } from 'actions/actions';
import { connect } from 'react-redux';

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

  processHighlights: function(highlights) {
    /* highlights: sorted (by start) list of highlights {start, end, topic}*/
    /*return processedhighlights of new {start, end, topics}*/
    var parsedHighlights = [];
    var processHighlights = [];
    for (i in highlights) {
      start = {"type": "start", "index": i.start, "topic": i.topic, "source": i};
      end = {"type": "end", "index": i.end, "topic": i.topic, "source": i};
      parsedHighlights.append(start);
      parsedHighlights.append(end);
    }
    /* sort by beginning index value, check if it works or not*/
    parsedHighlights.sort((a,b) => {
      if (a.index === b.index) {
        return 0;
      } else if (a.index < b.index) {
        return -1;
      } else {
        return 1;
      }
    });
    activeSources = [];
    activeTopic1 = false;
    activeTopic2 = false;
    activeTopic3 = false;
    activeTopic4 = false;
    start = 0;
    for (i in parsedHighlights) {
      if (activeTopic1 || activeTopic2 || activeTopic3 || activeTopic4) {
        var processed = {"start": -1, "end": -1, "topics": [], "source": []};
        processed.start = start;
        processed.end = i.start;
        processed.source = activeSources;
        if (activeTopic1) {
          processed.topics.append("topic1");
        }
        if (activeTopic2) {
          processed.topics.append("topic2");
        }
        if (activeTopic3) {
          processed.topics.append("topic3");
        }
        if (activeTopic4) {
          processed.topics.append("topic4");
        }
        processedHighlights.append(processed);
      }
      start = i.start;
      /* Update active topics */
      if (i.type === "start") {
        activeSources.append(i.source);
        switch(i.topic) {
          case("topic1"):
            activeTopic1 = true;
          case("topic2"):
            activeTopic2 = true;
          case("topic3"):
            activeTopic3 = true;
          case("topic4"):
            activeTopic4 = true;
        }
      }
      if (i.type === "end") {
        activeSources.remove(i.source);
        switch(i.topic) {
          case("topic1"):
            activeTopic1 = false;
          case("topic2"):
            activeTopic2 = false;
          case("topic3"):
            activeTopic3 = false;
          case("topic4"):
            activeTopic4 = false;
        }
      }
    }
    return processedHighlights;
  }

  mergeColors: function(topics) {
    var list = []
    /* list is a list of rgb colors*/
    /* may need a more flexible way of add topic colors */
    for (i in topics) {
      switch(i) {
        case "topic1":
          list.append(rgb(241,96,97));
        case "topic2":
          list.append(rgb(253,212,132));
        case "topic3":
          list.append(rgb(175,215,146));
        case "topics4":
          list.append(rgb(168,210,191));
      }
    }
    var colors = len(list);
    var fraction = 1/colors
    var red = 0;
    var blue = 0;
    var green = 0;
    for (i in list) {
      red += fraction*i.getRed();
      green += fraction*i.getGreen();
      blue += fraction*i.getBlue();
    }
    return rgb(red, green, blue)
  },

  render() {
    const {topic_id}: string = this.context.params
    let topic = this.props.topics[topic_id];

    var text = this.props.article.text;
    /* replace this.props.article with processHighlights(this.props.highlights)*/
    /*var highlights = this.props.highlights || [];*/
    var highlights = processedHighlights(this.props.highlights) || [];

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

                            // new
                            style={{background-color: mergeColors(curHL.topics)}}
                            source={curHL.source}
                            // new
                            className={'highlighted topic' /*+ curHL.topic*/}
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
