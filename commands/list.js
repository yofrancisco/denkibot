'use strict';

const DenkibotCommand = require('../DenkibotCommand');
const list = require('../components/list');

class List extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!list'];
    this.name = '!list';
  }

  respond({ originalMessage, originalText }) {
    const self = this;
    // this.simpleDenki(originalMessage, '!ical');
    if (originalText.indexOf('!lists') !== -1) {
      list.getListOfLists(originalMessage, self);
    } else if (originalText.indexOf(' add ') !== -1) {
      list.insertListItem(originalMessage, self);
    } else if (originalText.indexOf(' delete ') !== -1) {
      list.deleteListItem(originalMessage, self);
    } else {
      list.getList(originalMessage, self);
    }
  }
}

module.exports = List;
