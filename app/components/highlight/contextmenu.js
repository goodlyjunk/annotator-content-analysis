import React from 'react';

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


  render() {
    return (
      <nav id="context-menu" class="context-menu">
        <ul class="context-menu__items">
          <li class="context-menu__item">
            <a href="#" class="context-menu__link" data-action="View"><i class="fa fa-eye"></i> View Task</a>
          </li>
          <li class="context-menu__item">
            <a href="#" class="context-menu__link" data-action="Edit"><i class="fa fa-edit"></i> Edit Task</a>
          </li>
          <li class="context-menu__item">
            <a href="#" class="context-menu__link" data-action="Delete"><i class="fa fa-times"></i> Delete Task</a>
          </li>
        </ul>
      </nav>
    )
  }

})
