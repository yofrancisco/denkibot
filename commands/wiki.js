'use strict';

const DenkibotCommand = require('../DenkibotCommand');

class Wiki extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!wiki'];
    this.name = '!wiki';
  }

  respond({ originalMessage, originalText }) {
    const self = this.parent;
    let messaji = originalText;
    messaji = messaji.replace('!wiki', '');
    messaji = messaji.trim();
    messaji = messaji.replace(/ /g, '_');
    this.simpleDenki({
      originalMessage,
      message: `https://en.wikipedia.org/wiki/${messaji}`,
    });
  }
}

module.exports = Wiki;
