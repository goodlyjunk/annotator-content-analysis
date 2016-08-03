import React from 'react';

const mapStateToProps = state => {
  return {
    highlights: state.ContextMenu.highlights,
    selectedHighlight: state.highlight.selectedHighlight,
    currentTopic: state.
    };
}

const ContextMenu = React.createClass({
  displayName: 'Menu',
  propTypes: {
    topics: React.PropTypes.array.isRequired,
    options: React.PropTypes.array.isRequired,
    currentTopic: React.PropTypes.string.isRequired,
    selectedHighlight: React.PropTypes.array.isRequired
  },

  /*
  Necessary actions:
  Two sections:
  Change Topics:
  - change currentTopic
  - change the topic of the current selected highlight
  - need to prevent changing the topic from the
  Connect Topics:
  - show all current entries of that topic
  - add property of highlights, "connected"
  - when rendering, connected_topic = True, then all entries of topic are labeled
  - need to reference to connected Source

  Important:
  onContextMenu method gives the location of mouse click as e.pageX (left)
  and e.pageY (top). Based on this coordinates position the context menu absolutely.
  */

  handleTopic: function(topic) {
    onActivateTopic(topic);
  },

  handleOption: function(option) {
    /* Adds to connected property of current topic and the selected option */
  },

  render() {
    var connect_options = this.props.options.map(function(option) {
      return (
        <li onClick={this.handleOption(option)}>
          {topic}
          //Needs to be the name, the actual topics need to be passed in
          //Current topic should be put at the end, assuming that you're changing to others
        </li>
      );
    });

    var topic_options = this.props.topics.map(function(topic) {
      return (
        <li onClick={this.handleTopic(topic)}>
          {topic}
        </li>
      );
    });

    return (
      <nav id="context-menu" class="context-menu">
        <ul>
          <li>
            <li>
            Change
            </li>
            <ul>
            {topics_otions}
            </ul>
          </li>
          <li>
            <li>
            Connect
            </li>
            <ul>
            {connect_options}
            </ul>
          </li>
        </ul>
      </nav>
    )
  }
})
/* <ul class="context-menu__items">
  {buttons}
</ul>*/
