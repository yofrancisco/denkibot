'use strict';

const DenkibotCommand = require('../lib/command.js');

class Time extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!time'];
    this.name = '!time';
  }

  respond(originalMessage) {
    this.getDenkiTextFile(originalMessage, '../constants/time-cube');
  }
}

module.exports = Time;
