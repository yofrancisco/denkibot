'use strict';

const DenkibotCommand = require('../DenkibotCommand');

class Heart extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['heart'];
    this.name = '!heart';
  }

  stardewhearts(originalMessage) {
    const self = this.parent;
    const stardew = require('../components/stardew');
    stardew.calcHearts(originalMessage, self);
  }

  respond(originalMessage) {
    this.stardewhearts(originalMessage);
    return;
  }
}

module.exports = Heart;
