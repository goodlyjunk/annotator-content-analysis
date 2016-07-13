import React from 'react';
import { addHighlight, deleteHighlight, selectHighlight } from 'actions/highlight';
import { connect } from 'react-redux';
import jquery from 'jquery';
import { bindActionCreators } from 'redux';
import * as HighlightActions from 'actions/highlight'
//import 'text-highlighter/src/TextHighlighter'

import { styles } from './styles.scss';

const actions = Object.assign({}, HighlightActions);
//const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
/*const mapDispatchToProps = dispatch => {
  return {
    onHighlight: (start, end, selectedText) => {
      dispatch(addHighlight(start, end, selectedText));
    },
    onDeleteHighlight: (source) => {
      dispatch(deleteHighlight(source));
    },
    onSelectHighlight: (source) => {
      dispatch(selectHighlight(source));
    }
  };
}*/

const mapStateToProps = state => {
  //originally state.article.highlights
  return { highlights: state.highlights,
           currentTopic: state.currentTopic,
           selectedHighlight: state.selectedHighlight,};
}
export const Highlight = React.createClass({
  displayName: 'Highlight',

  propTypes: {
    /*onHighlight: React.PropTypes.func.isRequired,
    onDeleteHighlight: React.PropTypes.func.isRequired,
    onSelectHighlight: React.PropTypes.func.isRequired,*/
    text: React.PropTypes.string.isRequired,
    topics: React.PropTypes.array.isRequired,
    highlights: React.PropTypes.array.isRequired,
    currentTopic: React.PropTypes.string.isRequired,
    selectedHighlight: React.PropTypes.array.isRequired
  },

  /*
  Domain: current stored highlight objects
  Range: highlight-like objects that describe each text span

  1. Takes the current highlights and breaks each into a start and end object,
  2. Sorts the objects by their index in the text,
  3. Creates a new highlight-like object for each segment between objects. These
  objects will describe the spans that the render function creates. Each will have
  its own combination of topics according to its overlap,
  4. Checks if span has been selected, if so changes selected property to True
  5. Activates or deactivates topics based on whether the object describes the
  start of a highlight or the end of one
  6. Activates or deactivates source highlights (the highlights the span is representing)
  7. returns a list of span-objects with the same properties as highlight, which is passed
  into render.

  No alterations were made to render or to the article reducer - all
  this method does is reinterpret stored highlights so that render returns
  distinct spans that appear to be overlapping
  */

  /*onHighlight: function(start, end, selectedText) {
    dispatch(addHighlight(start, end, selectedText));
  },
  onDeleteHighlight: function(source) {
    dispatch(deleteHighlight(source));
  },
  onSelectHighlight: function(source) {
    dispatch(selectHighlight(source));
  },*/

  processHighlights: function(highlights) {
    var parsedHighlights = [];
    var final = [];

    // (1) works
    var temp_index = 0;
    while (temp_index < highlights.length) {
      var i = highlights[temp_index];
      var start = {type: 'start', index: i.start, topic: i.topic, source: i, selected: false};
      var end = {type: 'end', index: i.end, topic: i.topic, source: i, selected: false};
      parsedHighlights.push(start);
      parsedHighlights.push(end);
      temp_index += 1;
    }

    // (2) works
    parsedHighlights.sort((a,b) => {
      return a.index - b.index;
    });

    var activeSources = [];
    var activeTopics = [false, false, false, false];
    var topic_list = ['topic1', 'topic2', 'topic3', 'topic4'];
    var activeSelect = false;
    var start = 0;
    var end = 0;
    temp_index = 0;

    // (3)
    var selectedHighlights = this.props.selectedHighlight;
    while (temp_index < parsedHighlights.length) {
      var i = parsedHighlights[temp_index];
      var processed = {start: null, end: null, topics: [], source: activeSources.slice(0), selected: false};
      processed.start = start;
      processed.end = i.index;

      // (4)
      if (selectedHighlights.length) {
        var select_index = 0;
        while (select_index < selectedHighlights.length) {

          var selected_high = selectedHighlights[select_index]
          //Case for Single Highlight
          if ((selected_high[0] == processed.start) && (selected_high[1] == processed.end)) {
            processed.selected = true;
            break;
          } else if ((selected_high[0] < processed.start) && (processed.start < selected_high[1])) {
            processed.selected = true;
            break;
          } else if ((selected_high[0] < processed.end) && (processed.end < selected_high[1])) {
            processed.selected = true;
            break;
          }
          select_index += 1;
        }
      }

      // Add processed span to final
      start = i.index;
      var list_index = 0;
      while (list_index < activeTopics.length) {
        if (activeTopics[list_index]) {
          processed.topics.push(topic_list[list_index]);
        }
        list_index += 1;
      }
      final = final.concat(processed);

      // (5) Activate/Deactivate Topics
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

      // (6) Activate/Deactivate Sources
      if (active_state){
        var active = {start: i.source.start, end: i.source.end, text: i.source.text, top: i.source.topic};
        activeSources = activeSources.concat([active]);
      } else {
        var active = {start: i.source.start, end: i.source.end, text: i.source.text, top: i.source.topic};
        var source_index = -1;
        var index = 0;
        if (activeSources){
          while (index < activeSources.length) {
            var s = activeSources[index];
            if (s.start == active.start && s.end == active.end) {
              source_index = index;
              break;
            }
            index += 1;
          }
        }
        activeSources.splice(source_index, 1);
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
  /*
  Take topics, find the number, generate that many colors


  */
  mergeColors: function(topics, selected) {
    var list = [];
    var index = 0;
    //Need to adapt code so that more topics can be dynamically added
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
      index += 1;
    }
    var opacity = 0.5;
    if (selected) {
      opacity = 1;
    }
    if (list.length == 0) {
      return 'rgba(255, 255, 255, 0)';
    }
    return 'rgba(' + Math.round(red) + ', ' + Math.round(green) + ', ' + Math.round(blue) + ', ' + opacity +')';
  },


  componentDidMount: function() {
    let articleContainer = document.getElementById('highlight-wrapper');
    /*this.annotationsObject = new TextHighlighter(articleContainer);*/
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
    console.log('handleClick');
    console.log(this.props)
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
        //this.props.dispatch({ type: 'ADD_HIGHLIGHT', selection: {start, end, selectedText} })
        //this.props.onHighlight(start, end, selectedText);
        this.props.addHighlight(start, end, selectedText)
        /*onHighlight(start, end, selectedText);*/
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
    if (e.keyCode == 8 || e.keyCode == 46) {
      e.preventDefault();
      if (this.props.selectedHighlight) {
        this.props.deleteHighlight(this.props.selectedHighlight);
      }
    }
  },

  handleSelect: function(source, e) {
    this.props.selectHighlight(source);
  },


  render() {
    // console.log(this.props);
    // const {topic_id}: string = this.context.params
    // let topic = this.props.topics[topic_id];

    console.log('highlight wrapper render')
    console.log(this.props.text)
    console.log(this.props)

    var text = this.props.text;
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
      /*<div className='article'>
        <div className='tua__header-text'>
          Focus on the bold text about FOO and answer the questions.
        </div>*/

      <div ref={(ref) => this.articleRef = ref} /* id='article-container' className='article'*/ onClick={this.handleClick}>
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
      </div>
    );
  }

});

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(actions, dispatch)
  //mapDispatchToProps
)(Highlight);
