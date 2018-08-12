'use strict';

const DenkibotCommand = require('../DenkibotCommand');

class Time extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!time'];
    this.name = '!time';
  }

  respond({ originalMessage }) {
    this.getDenkiTextFile({ originalMessage, file: '../constants/time-cube' });
  }
}

module.exports = Time;
