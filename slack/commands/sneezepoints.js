'use strict';

const DenkibotCommand = require('../DenkibotCommand');

class SneezePoints extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!sneezepoints'];
    this.name = '!sneezepoints';
  }

  sneezepoints(originalMessage) {
    const self = this.parent;
    const sneezepoints = require('../components/sneezepoints');
    sneezepoints.calcPoints(originalMessage, self);
  }

  sneezepointsLeaderboard(originalMessage) {
    const self = this.parent;
    const sneezepoints = require('../components/sneezepoints');
    sneezepoints.leaderboard(originalMessage, self);
  }

  respond(originalMessage) {
    if (originalMessage.text.indexOf('leaderboard') !== -1) {
      this.sneezepointsLeaderboard(originalMessage);
    } else {
      this.sneezepoints(originalMessage);
    }
    return;
  }
}

module.exports = SneezePoints;
