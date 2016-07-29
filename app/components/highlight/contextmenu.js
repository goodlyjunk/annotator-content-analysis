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
    currentTopic: React.PropTypes.string.isRequired,
    selectedHighlight: React.PropTypes.array.isRequired
  },

  /*
  Necessary actions:
  change currentTopic
  change topic of current highlight

  */

  handleTopic: function(topic) {
    onActivateTopic(topic);
  },


  render() {
    var buttons = this.props.topics.map(function(topic) {
      return (
        <li onClick={this.handleTopic(topic)}>
          {str(topic)}
        </li>
      );
    });
    return (
      <nav id="context-menu" class="context-menu">
        <ul class="context-menu__items">
          {buttons}
        </ul>
      </nav>
    )
  }
})
