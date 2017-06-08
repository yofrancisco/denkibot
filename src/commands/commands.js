'use strict';

const DenkibotCommand = require('../lib/command.js');

class Commands extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['command'];
    this.name = '!command';
  }

  respond(originalMessage) {
    this.getDenkiTextFile(originalMessage, '../constants/commands');
  }
}

module.exports = Commands;
