'use strict';

const DenkibotCommand = require('../lib/command.js');

class Savage extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!savage'];
    this.name = '!savage';
  }

  respond(originalMessage) {
    this.coinflip(originalMessage, ['k', 'Ķ', '⒦', '𝑲', '𝒦', '𝓴', '𝕜']);
  }
}

module.exports = Savage;
