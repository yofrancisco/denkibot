'use strict';

const DenkibotCommand = require('../DenkibotCommand');

class Ping extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['ping'];
    this.name = '!ping';
  }

  respond({ originalMessage }) {
    this.simpleDenki({ originalMessage, message: '!pong' });
  }
}

module.exports = Ping;
