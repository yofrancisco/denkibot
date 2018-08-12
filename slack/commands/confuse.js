'use strict';

const DenkibotCommand = require('../DenkibotCommand');

class Confuse extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['confuse'];
    this.name = '!confuse';
  }

  respond(originalMessage) {
    this.confuseDenki(originalMessage, 'general', 'confuse');
  }
}

module.exports = Confuse;
