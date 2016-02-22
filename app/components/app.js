import React from 'react';
import { Provider } from 'react-redux';
// import AppStore from 'store/appStore';

export default React.createClass({
  displayName: 'App',

  propTypes: {
    children: React.PropTypes.object.isRequired
  },

  // getInitialState() {
  //   return AppStore.getState();
  // },

  // componentDidMount() {
  //   AppStore.listen(this.onChange);
  // },
  //
  // onChange() {
  //   this.setState(this.getInitialState());
  // },

  render() {
    return (
      <div className='app'>
        {this.props.children}
      </div>
    );
  }
});
