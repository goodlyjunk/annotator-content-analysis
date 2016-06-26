import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionsGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';

import { newArticle } from 'actions/article';

import Article from 'components/Article';
import TopicPicker from 'components/topicPicker';

const mapDispatchToProps = dispatch => {
  return {
    onNewArticle: article => {
      dispatch(newArticle(article));
    }
  };
}

const mapStateToProps = state => {
  return { articles: state.articleReducers.articles,
           topics: state.articleReducers.topics,
           curArticle: state.articleReducers.curArticle };
}

@connect (
    mapStateToProps,
    mapDispatchToProps
)
export class TopicHighlighter extends Component {
  constructor(props) {
    super(props);
  }

  handleNext() {
    this.props.onNewArticle(this.props.curArticle + 1);
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  render() {
    console.log(this.props);
    let cur_article = this.props.curArticle;
    let article = this.props.articles[cur_article];
    let topics = this.props.topics[cur_article];

    return (
      <ReactCSSTransitionsGroup transitionName='fadein'
                                transitionAppear
                                transitionAppearTimeout={500}
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={500}>
        <div className='tua'>
          <div className='text-wrapper'>
            <ReactCSSTransitionsGroup transitionName='fade-between'
                                      transitionAppear
                                      transitionAppearTimeout={500}
                                      transitionEnterTimeout={500}
                                      transitionLeaveTimeout={500}>
              <Article topics={topics} article={article} key={cur_article}/>
            </ReactCSSTransitionsGroup>
            <br/>
            <button onClick={this.handleNext}>Next</button>
          </div>
          <TopicPicker topics={topics}/>
        </div>
      </ReactCSSTransitionsGroup>
    );
  }
};
