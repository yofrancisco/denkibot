'use strict';

const DenkibotCommand = require('../lib/command.js');
const list = require('../components/list');

class List extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!list'];
    this.name = '!list';
  }

  respond(originalMessage) {
    const self = this.parent;
    // this.simpleDenki(originalMessage, '!ical');
    if (originalMessage.text.indexOf('!lists') !== -1) {
      list.getListOfLists(originalMessage, self);
    } else if (originalMessage.text.indexOf(' add ') !== -1) {
      list.insertListItem(originalMessage, self);
    } else if (originalMessage.text.indexOf(' delete ') !== -1) {
      list.deleteListItem(originalMessage, self);
    } else {
      list.getList(originalMessage, self);
    }
  }
}

module.exports = List;
