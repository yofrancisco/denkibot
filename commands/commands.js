'use strict';

const DenkibotCommand = require('../DenkibotCommand');

class Commands extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['command'];
    this.name = '!command';
  }

  respond({ originalMessage }) {
    this.getDenkiTextFile({ originalMessage, file: './constants/commands' });
  }
}

module.exports = Commands;
