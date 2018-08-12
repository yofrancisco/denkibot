'use strict';

const DenkibotCommand = require('../lib/command.js');
const names = require('../../constants/names');

class Winner extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['winner'];
    this.name = '!winner';
  }

  winner(originalMessage) {
    const self = this.parent;
    const winner = names[Math.floor(Math.random() * names.length)];

    this.simpleDenki(
      originalMessage,
      `the winner is: ${winner} :kissing_heart:`,
    );
  }

  respond(originalMessage) {
    this.winner(originalMessage);
  }
}

module.exports = Winner;
