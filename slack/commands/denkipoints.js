'use strict';

const DenkibotCommand = require('../DenkibotCommand');

class DenkiPoints extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['denkipoints'];
    this.name = '!denkipoints';
  }

  denkipoints(originalMessage) {
    const self = this.parent;
    const denkipoints = require('../components/denkipoints');
    denkipoints.calcPoints(originalMessage, self);
  }

  denkipointsLeaderboard(originalMessage) {
    const self = this.parent;
    const denkipoints = require('../components/denkipoints');
    denkipoints.leaderboard(originalMessage, self);
  }

  respond(originalMessage) {
    if (originalMessage.text.indexOf('leaderboard') !== -1) {
      this.denkipointsLeaderboard(originalMessage);
    } else {
      this.denkipoints(originalMessage);
    }
    return;
  }
}

module.exports = DenkiPoints;
