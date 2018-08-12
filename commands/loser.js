'use strict';

const DenkibotCommand = require('../DenkibotCommand');
const names = require('../constants/names');

class Loser extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['loser'];
    this.name = '!loser';
  }

  loser({ originalMessage }) {
    const self = this.parent;
    const winner = names[Math.floor(Math.random() * names.length)];

    this.simpleDenki({
      originalMessage,
      message: `the loser is: ${winner} :pogchamp:`,
    });
  }

  respond({ originalMessage }) {
    this.loser({ originalMessage });
  }
}

module.exports = Loser;
