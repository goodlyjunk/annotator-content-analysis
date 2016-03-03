import { newQuestions } from 'actions/actions';
import classNames from 'classnames';
import QuizQuestion from 'components/quiz/QuizQuestion.js';
import React from 'react';
import ReactCSSTransitionsGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import tmpQuestions from 'assets/tmpQuestions.json';

import 'Quiz.scss';
import 'fadeIn.scss';

const mapDispatchToProps = dispatch => {
  return {
    onNewQuestions: questions => {
      dispatch(newQuestions(questions));
    }
  };
}

const mapStateToProps = state => {
  return { questions: state.quizReducers.questions };
}

const Quiz = React.createClass({
  displayName: 'Quiz',

  propTypes: {
    onNewQuestions: React.PropTypes.function,
    questions: React.PropTypes.array.isRequired
  },

  getInitialState: function() {
    var questionFlags = {}
    for (var i = 0; i < this.props.questions.length; i++) {
      questionFlags[this.props.questions[i].id] = false
    }
    return {questionAnswerFlags: questionFlags};
  },

  onUpdate: function(questionId, onAnswered) {
    var questionFlags = this.state.questionAnswerFlags;
    questionFlags[questionId] = onAnswered;
    this.setState({questionAnswerFlags: questionFlags});
  },

  canClickNext: function() {
    var questionFlags = this.state.questionAnswerFlags;
    for (var key in questionFlags) {
      if (!questionFlags[key]) {
        return false;
      }
    }
    return true;
  },

  prompt: function() {
    var questionFlags = this.state.questionAnswerFlags;
    for (var key in questionFlags) {
      if (questionFlags[key]) {
        return true;
      }
    }
    return false;
  },

  handleNext: function(e) {
    this.props.onNewQuestions(tmpQuestions.questions);
  },

  render() {
    var opts = this.canClickNext() ? {} : {disabled: true};
    return (
      <ReactCSSTransitionsGroup transitionName='fadein' transitionAppear>
        <span className={classNames('prompt', {active: this.prompt()})}>Please highlight the text from below</span>
        <div className='quiz'>
          {this.props.questions.map((question) => {
            return (
              <QuizQuestion key={question.id}
                            question={question}
                            onUpdate={this.onUpdate} />
            );
          })}
          <button className='quiz__next' {...opts}
                  onClick={this.handleNext}
          >
            Next
          </button>
        </div>
      </ReactCSSTransitionsGroup>
    );
  }

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
