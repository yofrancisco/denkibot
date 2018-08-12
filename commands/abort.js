'use strict';

const DenkibotCommand = require('../DenkibotCommand');

class Abort extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['ABORT'];
    this.name = '!ABORT';
  }

  respond({ originalMessage }) {
    this.getDenkiTextFile({ originalMessage, file: './constants/abort' });
  }
}

module.exports = Abort;
