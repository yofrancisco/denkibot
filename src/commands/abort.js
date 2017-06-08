'use strict';

const DenkibotCommand = require('../lib/command.js');

class Abort extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['ABORT'];
    this.name = '!ABORT';
  }

  respond(originalMessage) {
    this.getDenkiTextFile(originalMessage, '../constants/abort');
  }
}

module.exports = Abort;
