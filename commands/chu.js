'use strict';

const DenkibotCommand = require('../DenkibotCommand');

class Chu extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['sneezing', '!chu', 'choo'];
    this.name = '!chu';
  }

  respond({ originalMessage }) {
    this.simpleDenki({ originalMessage, message: '!bless you' });
  }
}

module.exports = Chu;
