'use strict';

const DenkibotCommand = require('../lib/command.js');
const werewolf = require('../components/werewolf');

class Werewolf extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!werewolf'];
    this.name = '!werewolf';
  }

  respond(originalMessage) {
    const self = this.parent;
    // this.simpleDenki(originalMessage, '!ical');
    if (originalMessage.text.indexOf('setplayers') !== -1) {
      werewolf.setPlayers(originalMessage, self);
    } else if (originalMessage.text.indexOf('players') !== -1) {
      werewolf.players(originalMessage, self);
    } else if (originalMessage.text.indexOf('action') !== -1) {
      werewolf.action(originalMessage, self);
    } else if (originalMessage.text.indexOf('start') !== -1) {
      werewolf.start(originalMessage, self);
    } else {
      werewolf.roles(originalMessage, self);
    }
  }
}

module.exports = Werewolf;
