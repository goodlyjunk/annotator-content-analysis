import React from 'react';
import 'Quiz.scss';

export default React.createClass({
  displayName: 'QuizAnswer',

  propTypes: {
    answer: React.PropTypes.object.isRequired,
    isSelected: React.PropTypes.bool.isRequired,
    id: React.PropTypes.number.isRequired,
    colors: React.PropTypes.string.isRequired,
    answerProcessed: React.PropTypes.func.isRequired,
    type: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {color: ''}
  },

  onChange: function(e) {
    if (this.props.type === 'text') {
      this.props.answerProcessed(-1, false, e.target.value);
    }
  },

  onClick: function() {
    if (this.props.type === 'radio') {
      this.setState({color: this.props.colors});
      this.props.answerProcessed(this.props.id, true);
    } else if (this.props.type === 'checkbox') {
      this.setState({color: this.props.isSelected ? ''
                                                  : this.props.colors});
      this.props.answerProcessed(this.props.id, !this.props.isSelected);
    }
  },

  render() {
    var answer = this.props.answer;
    var style = {};
    if (this.props.type === 'radio' && !this.props.isSelected) {
      style = {
        backgroundColor: ''
      };
    } else {
      style = {
        backgroundColor: this.state.color
      };
    }

    return (
      <div className='quiz__answer'>
        <input onClick={this.onClick} onChange={this.onChange}
           type={this.props.type}
           name={answer.question}
           placeholder='Enter name'>
        </input>
        <span className='quiz__answer' style={style}>{this.props.type === 'radio' || this.props.type == 'checkbox' ? ' ' + answer.text : ''}</span>
      </div>
    );
  }

});
