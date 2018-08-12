'use strict';

const DenkibotCommand = require('../DenkibotCommand');

class Aesthetic extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!aesthetic'];
    this.name = '!aesthetic';
  }

  respond({ originalMessage, originalText }) {
    const self = this.parent;
    let messaji = originalText;
    messaji = messaji.replace('!aesthetic', '');
    messaji = messaji.trim();
    messaji = messaji.split('').join(' ');
    messaji = messaji.toUpperCase();
    this.simpleDenki(originalMessage, `${messaji}`);
  }
}

module.exports = Aesthetic;
