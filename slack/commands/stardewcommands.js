'use strict';

const DenkibotCommand = require('../DenkibotCommand');

class StardewCommands extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['stardew'];
    this.name = '!stardew';
  }

  respond(originalMessage) {
    this.getDenkiTextFile(originalMessage, '../constants/stardewcommands');
  }
}

module.exports = StardewCommands;
