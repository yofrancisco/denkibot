'use strict';

const DenkibotCommand = require('../DenkibotCommand');

class Genki extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!genki'];
    this.name = '!genki';
  }

  respond({ originalMessage }) {
    this.simpleDenki({ originalMessage, message: '!denki' });
  }
}

module.exports = Genki;
