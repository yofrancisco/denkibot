'use strict';

const DenkibotCommand = require('../lib/command.js');

class CoinFlip extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!coinflip'];
    this.name = '!coinflip';
  }

  respond(originalMessage) {
    let messaji;
    if (originalMessage.text.indexOf(',') !== -1) {
      messaji = originalMessage.text
        .replace('!coinflip', '')
        .trim()
        .split(',');
    } else {
      messaji = originalMessage.text
        .replace('!coinflip', '')
        .trim()
        .split(' ');
    }

    console.log(messaji);
    if (messaji.length > 1) {
      this.coinflip(originalMessage, messaji);
    } else {
      this.coinflip(originalMessage, [
        '!heads',
        '!tails',
        '!the coin reluctantly rolled away from your indecisiveness to make you a better person',
      ]);
    }
  }
}

module.exports = CoinFlip;
