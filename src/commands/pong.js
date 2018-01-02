'use strict';

const DenkibotCommand = require('../lib/command.js');

class Pong extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['pong'];
    this.name = '!pong';
  }

  respond(originalMessage) {
    this.simpleDenki(originalMessage, '!pang');
  }
}

module.exports = Pong;
