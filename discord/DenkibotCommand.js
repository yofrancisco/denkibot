'use strict';
// Base class for Denkibot Commands.

const spookycount = [];

const defaultMessageOptions = {
  reply: false,
};

class DenkibotCommand {
  constructor() {
    this.keywords = [];
    this.name = '';
    this.spookycount = spookycount;
  }

  respond(originalMessage) {
    originalMessage.reply('!responding!', defaultMessageOptions);
  }

  simpleDenki(originalMessage, message) {
    originalMessage.reply(message, defaultMessageOptions);
  }

  coinflip(originalMessage, denkiChoices) {
    const winner =
      denkiChoices[Math.floor(Math.random() * denkiChoices.length)];
    originalMessage.reply(`${winner}`, defaultMessageOptions);
  }

  getDenkiTextFile(originalMessage, file) {
    const textfile = require(file);
    const text = textfile.denki();
    originalMessage.reply(`${text}`, defaultMessageOptions);
  }
}

module.exports = DenkibotCommand;
