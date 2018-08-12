'use strict';

const DenkibotCommand = require('../DenkibotCommand');

class CoinFlip extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!coinflip'];
    this.name = '!coinflip';
  }

  respond({ originalMessage, originalText }) {
    let messaji;

    if (originalText.indexOf(',') !== -1) {
      messaji = originalText
        .replace('!coinflip', '')
        .trim()
        .split(',');
    } else {
      messaji = originalText
        .replace('!coinflip', '')
        .trim()
        .split(' ');
    }

    console.log(messaji);
    if (messaji.length > 1) {
      this.coinflip({ originalMessage, denkiChoices: messaji });
    } else {
      this.coinflip({
        originalMessage,
        denkiChoices: [
          '!heads',
          '!tails',
          '!the coin reluctantly rolled away from your indecisiveness to make you a better person',
        ],
      });
    }
  }
}

module.exports = CoinFlip;
