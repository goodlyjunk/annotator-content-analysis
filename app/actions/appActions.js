import alt from '../utils/alt';

class AppActions {
  constructor() {
    this.generateActions(
      'changeTopic',
      'addHighlight',
      'removeHighlight'
    );
  }
}

export default alt.createActions(AppActions);
