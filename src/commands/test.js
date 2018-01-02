'use strict';

const DenkibotCommand = require('../lib/command.js');

class Test extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['test'];
    this.name = '!test';
  }

  respond(originalMessage) {
    this.simpleDenki(originalMessage, '!ical');
  }
}

module.exports = Test;
