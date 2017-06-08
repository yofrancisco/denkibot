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
    const x = math.eval(messaji);
    this.simpleDenki(originalMessage, x);
  }
}

module.exports = Test;
