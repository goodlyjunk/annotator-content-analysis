import React from 'react';
import 'Quiz.scss';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment';

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
    if (this.props.type !== 'datetime') {
      return {color: ''};
    }
    return {color: '',
      dateTime: moment().format('MM/DD/YYYY h:mm A'),
      format: 'MM/DD/YYYY h:mm A',
      inputFormat: 'MM/DD/YYYY h:mm A'};
  },

  onChange: function(e) {
    if (this.props.type === 'text') {
      this.props.answerProcessed(-1, false, e.target.value);
    } else if (this.props.type === 'datetime') {
      //console.log(moment.unix(e).format('DD/MM/YYYY h:mm A'));
      //console.log(e);
      this.setState({dateTime: e});
      this.props.answerProcessed(-1, false, e);
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
    var retval = null;
    if (this.props.type === 'datetime') {
      const {dateTime, format, inputFormat} = this.state;
      retval = (
        <DateTimeField
        dateTime={dateTime}
        format={format}
        inputFormat={inputFormat}
        onChange={this.onChange}/>
      );
      //retval = <DateTimeField onChange={this.onChange}/>;
    } else {
      retval = (
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
    return retval;
  }

});
