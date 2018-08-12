'use strict';

const DenkibotCommand = require('../DenkibotCommand');
// let complimentcounts = new Array();

class Compliment extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['compliment', '!denkion'];
    this.name = '!compliment';
  }

  respond({ originalMessage }) {
    this.compliment({ originalMessage });
    return;
  }
}

module.exports = Compliment;
