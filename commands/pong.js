'use strict';

const DenkibotCommand = require('../DenkibotCommand');

class Pong extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['pong'];
    this.name = '!pong';
  }

  respond({ originalMessage }) {
    this.simpleDenki({ originalMessage, message: '!pang' });
  }
}

module.exports = Pong;
