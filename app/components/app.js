import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/appStore.js';

const store = configureStore();

export default React.createClass({
  displayName: 'App',

  propTypes: {
    children: React.PropTypes.object.isRequired
  },

  onChange() {
    this.setState(this.getInitialState());
  },

  render() {
    return (
      <Provider store={store}>
        <div className='app'>
          {this.props.children}
        </div>
      </Provider>
    );
  }
});