'use strict';

const DenkibotCommand = require('../lib/command.js');

class Wiki extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!wiki'];
    this.name = '!wiki';
  }

  respond(originalMessage) {
    const self = this.parent;
    let messaji = originalMessage.text;
    messaji = messaji.replace('!wiki', '');
    messaji = messaji.trim();
    messaji = messaji.replace(/ /g, '_');
    this.simpleDenki(
      originalMessage,
      `https://en.wikipedia.org/wiki/${messaji}`,
    );
  }
}

module.exports = Wiki;
