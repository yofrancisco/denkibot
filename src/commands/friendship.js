'use strict';

const DenkibotCommand = require('../lib/command.js');

class Friendship extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['friend', 'relationship'];
    this.name = '!friendship';
  }

  stardewfriendships(originalMessage) {
    const self = this.parent;
    const stardew = require('../components/stardew');
    stardew.friendships(originalMessage, self);
  }

  respond(originalMessage) {
    this.stardewfriendships(originalMessage);
    return;
  }
}

module.exports = Friendship;
