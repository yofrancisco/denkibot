'use strict';

const DenkibotCommand = require('../DenkibotCommand');

class Google extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!google'];
    this.name = '!google';
  }

  respond({ originalMessage }) {
    const self = this.parent;
    let messaji = originalMessage.text;
    messaji = messaji.replace(/!google/g, '');
    messaji = messaji.trim();
    messaji = messaji.replace(/ /g, '+');
    this.simpleDenki({
      originalMessage,
      message: `http://www.google.com/search?q=${messaji}`,
    });
  }
}

module.exports = Google;
