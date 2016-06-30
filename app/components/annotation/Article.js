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

const processHighlights = highlights => {
  /* highlights: sorted (by start) list of highlights {start, end, topic}*/
  /*return processedhighlights of new {start, end, topics}*/
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

  /* sort by beginning index value, check if it works or not*/
  parsedHighlights.sort((a,b) => {
    return a.index - b.index;
  });
  console.log(parsedHighlights)
  /* If active, then highlight should be applied to span */
  var activeSources = [];
  var activeTopic1 = false;
  var activeTopic2 = false;
  var activeTopic3 = false;
  var activeTopic4 = false;
  var start = 0;
  var end = 0;
  temp_index = 0;
  while (temp_index < parsedHighlights.length) {
    /* If any topic is active, then span will be generated */
    var i = parsedHighlights[temp_index];
    //if (activeTopic1 || activeTopic2 || activeTopic3 || activeTopic4) {
      console.log('Making processed highlights')
      var processed = {start: null, end: null, topics: [], source: []};
      console.log(processed)
      if (i.type === 'start') {
        processed.start = start;
        processed.end = i.index;
        start = i.index;
      }
      if (i.type === 'end') {
        processed.start = start;
        processed.end = i.index;
        start = i.index;
      }

      processed.source = activeSources;
      if (activeTopic1) {
        processed.topics.push('topic1');
      }
      if (activeTopic2) {
        processed.topics.push('topic2');
      }
      if (activeTopic3) {
        processed.topics.push('topic3');
      }
      if (activeTopic4) {
        processed.topics.push('topic4');
      }
      final.push(processed);
    //}
    console.log(activeTopic1);
    console.log(activeTopic2);
    console.log(activeTopic3);
    console.log(activeTopic4);

    /* Update active topics */
    /* start = activate topics */
    if (i.type === 'start') {
      activeSources.push(i.source);
      if (i.topic === '1') {
        activeTopic1 = true;
      } else if (i.topic === '2') {
        activeTopic2 = true;
      } else if (i.topic === '3') {
        activeTopic3 = true;
      } else if (i.topic === '4') {
        activeTopic4 = true;
      }
    }
    /* end = deactivate topics */
    if (i.type === 'end') {
      activeSources.pop(i.source);
      if (i.topic === '1') {
        activeTopic1 = false;
      } else if (i.topic === '2') {
        activeTopic2 = false;
      } else if (i.topic === '3') {
        activeTopic3 = false;
      } else if (i.topic === '4') {
        activeTopic4 = false;
      }
    }
    temp_index += 1;
  }

  console.log('final')
  console.log(final);
  /* [{start:, end:, topics:, source:}]*/
  return final;
}

const mergeColors = topics =>  {
  var list = [];
  var index = 0;
  while (index < topics.length) {
    console.log('topics: ' + topics[index]);
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

  render() {
    const {topic_id}: string = this.context.params
    let topic = this.props.topics[topic_id];

    var text = this.props.article.text;
    /* replace this.props.article with processHighlights(this.props.highlights)*/
    /*var highlights = this.props.highlights || [];*/
    console.log(this.props.highlights)
    var highlights = processHighlights(this.props.highlights) || [];
    console.log(highlights)

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
                            style={{backgroundColor: mergeColors(curHL.topics)}}
                            source={curHL.source}
                            // new
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
