'use strict';

const DenkibotCommand = require('../DenkibotCommand');

class Savage extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!savage'];
    this.name = '!savage';
  }

  respond({ originalMessage }) {
    this.coinflip({
      originalMessage,
      message: ['k', 'Ķ', '⒦', '𝑲', '𝒦', '𝓴', '𝕜'],
    });
  }
}

module.exports = Savage;
