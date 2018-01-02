'use strict';

const DenkibotCommand = require('../lib/command.js');

class Src extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['src', 'source', 'sauce'];
    this.name = '!src';
  }

  respond(originalMessage) {
    this.simpleDenki(
      originalMessage,
      ':francas: https://github.com/francismartinez/denkibot',
    );
  }
}

module.exports = Src;
