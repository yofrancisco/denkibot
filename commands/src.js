'use strict';

const DenkibotCommand = require('../DenkibotCommand');

class Src extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['src', 'source', 'sauce'];
    this.name = '!src';
  }

  respond({ originalMessage }) {
    this.simpleDenki({
      originalMessage,
      message: ':francas: https://github.com/francismartinez/denkibot',
    });
  }
}

module.exports = Src;
