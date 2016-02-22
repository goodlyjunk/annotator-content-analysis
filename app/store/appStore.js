// Redux is reducer centric - this is marked for deletion

import { createStore } from 'redux';
import AppActions from 'actions/appActions';
import reducerExample from 'reducers/reducerExample'
import data from 'assets/tua.json';

let store = createStore(reducerExample);
export default store;
