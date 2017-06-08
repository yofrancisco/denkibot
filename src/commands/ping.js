'use strict';

const DenkibotCommand = require('../lib/command.js');

class Ping extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['ping'];
    this.name = '!ping';
  }

  respond(originalMessage) {
    this.simpleDenki(originalMessage, "!pong");
  }
}

module.exports = Ping;
