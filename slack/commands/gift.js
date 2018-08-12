'use strict';

const DenkibotCommand = require('../DenkibotCommand');

class Gift extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['gift', 'give'];
    this.name = '!gift';
  }

  stardewgift(originalMessage) {
    const self = this.parent;
    const stardew = require('../components/stardew');
    stardew.gift(originalMessage, self);
  }

  respond(originalMessage) {
    this.stardewgift(originalMessage);
    return;
  }
}

module.exports = Gift;
