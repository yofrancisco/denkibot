'use strict';

const DenkibotCommand = require('../DenkibotCommand');
const math = require('mathjs');

class Test extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!math'];
    this.name = '!math';
  }

  respond({ originalMessage, originalText }) {
    let messaji = originalText;
    messaji = messaji.replace(/!math/g, '');
    try {
      const x = math.eval(messaji);
      this.simpleDenki({ originalMessage, message: x });
    } catch (err) {
      //
      this.simpleDenki({ originalMessage, message: 'no' });
    }
  }
}

module.exports = Test;
