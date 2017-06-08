'use strict';

const DenkibotCommand = require('../lib/command.js');

class Chu extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['sneezing', '!chu', 'choo'];
    this.name = '!chu';
  }

  respond(originalMessage) {
    this.simpleDenki(originalMessage, "!bless you");
  }
}

module.exports = Chu;
