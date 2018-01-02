'use strict';

const DenkibotCommand = require('../lib/command.js');
const math = require('mathjs');

class Test extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!math'];
    this.name = '!math';
  }

  respond(originalMessage) {
    let messaji = originalMessage.text;
    messaji = messaji.replace(/!math/g, '');
    try {
      const x = math.eval(messaji);
      this.simpleDenki(originalMessage, x);
    } catch (err) {
      //
      this.simpleDenki(originalMessage, 'no');
    }
  }
}

module.exports = Test;
