import React from 'react';
import jquery from 'jquery';
import AppStore from 'store/appStore';
import CollapsibleList from './collapsibleList.js';

import 'topicpicker.scss';

export default React.createClass({
  displayName: 'TopicPicker',

  propTypes: {
    topics: React.PropTypes.array.isRequired
  },

  childContextTypes: {
    topics: React.PropTypes.array.isRequired
  },

  getChildContext() {
    return {
      topics: this.props.topics
    };
  },

  getInitialState() {
    return AppStore.getState();
  },

  componentDidMount() {
    // TODO: once everything is react-ified we shouldn't need jquery
    // though this is arguably much less boilerplate code than react
    var $ = jquery;

    function deleteMeSomeday() {
      function activateTopic(topic) {
        $('.topic-picker__nav li').removeClass('active');
        $(`.topic-picker__nav li[data-topic='${topic}']`).addClass('active');
        $('.text-wrapper__text').attr('data-topic', topic);

        $('.topic-wrapper').hide();
        $(`.topic-wrapper[data-topic="${topic}"]`).show();
      }

      $(document).ready(() => {
        $('.topic-picker__pin-button').click(function() {
          $('.topic-picker').toggleClass('topic-picker--open');
          $(this).toggleClass('fa-inverse');
        });
        $('.topic-picker__nav li').click(function() {
          activateTopic($(this).attr('data-topic'));
        });

        activateTopic('1');
      });
    }
    deleteMeSomeday();
  },

  render() {
    // TODO: break this into its component pieces
    // const {topicId}: string = this.context.router.getCurrentParams();

    return (
      <div className='topic-picker topic-picker--left'>
        <ul className='topic-picker__nav'>
          <li data-topic='1'><b>Topic 1</b></li>
          <li data-topic='2'><b>Topic 2</b></li>
          <li data-topic='3'><b>Topic 3</b></li>
          <li data-topic='4'><b>Topic 4</b></li>
        </ul>
        <div className='topic-picker__wrapper'>
          <div className='topic-picker__pin-button'>
            <i className='fa fa-thumb-tack fa-lg'></i>
          </div>
          <div className='topic-wrapper' data-topic='1'>
            <div className='topic-wrapper__topic'>
              Topic 1 is cottage cheese mascarpone croque monsieur hard cheese. Ricotta.<br/>
              <br/>
              Cow monterey jack taleggio. Cream cheese say cheese cheese triangles cut the cheese when the cheese comes out everybody is happy parmesan cheesecake say cheese. Boursin cut the cheese jarlsberg goat pecorino everyone loves cheesy feet stinking bishop.
              <CollapsibleList />
            </div>
          </div>
          <div className='topic-wrapper' data-topic='2'>
            <div className='topic-wrapper__topic'>
              Topic 2 is Bacon ipsum dolor amet tail fatback pancetta bresaola chicken. Sausage alcatra frankfurter, corned beef fatback ball tip ground round. Tri-tip pork loin cow spare ribs andouille, short ribs pork chop ham hamburger sirloin beef ribs brisket drumstick flank tenderloin. Pork loin chicken beef ribs, andouille salami frankfurter short ribs beef leberkas bacon. Pastrami turducken prosciutto spare ribs, beef tail cupim t-bone biltong doner picanha bresaola salami. Strip steak brisket ball tip tri-tip rump ground<br/>
              <CollapsibleList />
            </div>
          </div>
        </div>
      </div>
    );
  }

});
