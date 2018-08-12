'use strict';

const DenkibotCommand = require('../DenkibotCommand');

class Test extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!test'];
    this.name = '!test';
  }

  respond({ originalMessage }) {
    this.simpleDenki({ originalMessage, message: '!ical' });
  }
}

module.exports = Test;
