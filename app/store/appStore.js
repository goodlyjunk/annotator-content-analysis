import alt from 'utils/alt';
import AppActions from 'actions/appActions';
import TextPositionAnchor from 'dom-anchor-text-position';
import data from 'assets/tua.json';
import topicMock from 'assets/topicMock.json';

// #TODO: we will eventually need to move off mock data.
// what is API structure? workflow? how are we fetching one TUA after the other?

class AppStore {
  constructor() {
    this.bindActions(AppActions);
    this.tua = data.results;
    this.topicId = 0;
    this.topicsTmp = topicMock.topicsTmp
    this.highlights = {};
    this.highlighterColor = this.topicsTmp[this.topicId].color;
  }

  onChangeTopic(data) {
    this.topicId = data - 1
    this.highlighterColor = this.topicsTmp[this.topicId].color;
  }

  onAddHighlight(domRoot) {
    if (window.getSelection()) {
      let selectedText = window.getSelection().toString();
      let start = domRoot.textContent.indexOf(selectedText);
      let end = start + selectedText.length;
      let newTextPosition = new TextPositionAnchor(domRoot, start, end);
      if (!this.highlights[this.topicId]) {
        console.log(this.topicId)
        this.highlights[this.topicId] = []
      }
      this.highlights[this.topicId].push(newTextPosition);

      let newNode = document.createElement('span');
      newNode.className = 'text-span';
      newNode.setAttribute('style', `color: ${this.highlighterColor}`);
      let range = newTextPosition.toRange();
      range.surroundContents(newNode);
    }
  }

  onRemoveHighlight(data) {
    console.log(this.highlights);
    return data
  }

}

export default alt.createStore(AppStore, 'AppStore');
