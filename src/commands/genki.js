'use strict';

const DenkibotCommand = require('../lib/command.js');

class Genki extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!genki'];
    this.name = '!genki';
  }

  respond(originalMessage) {
    this.simpleDenki(originalMessage, '!denki');
  }
}

module.exports = Genki;
