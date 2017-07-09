'use strict';

const DenkibotCommand = require('../lib/command.js');

class Aesthetic extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!aesthetic'];
    this.name = '!aesthetic';
  }

  respond(originalMessage) {
    const self = this.parent;
    let messaji = originalMessage.text;
    messaji = messaji.replace('!aesthetic', '');
    messaji = messaji.trim();
    messaji = messaji.split('').join(' ');
    messaji = messaji.toUpperCase();
    this.simpleDenki(originalMessage, `${messaji}`);
  }
}

module.exports = Aesthetic;
