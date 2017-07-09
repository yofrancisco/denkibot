'use strict';

const DenkibotCommand = require('../lib/command.js');
const config = require('../config');

class Moments extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!memory', '!memories', '!quotes', '!moments', '!mangomoments', '!mangoquotes', '!mangomemories'];
    this.name = '!memory';
  }

  getMoment(originalMessage) {
    const self = this.parent;
    const moments = require('../components/moments');
    moments.getMoment(originalMessage, self);
  }

  addMoment(originalMessage) {
    const self = this.parent;
    const moments = require('../components/moments');
    moments.addMoment(originalMessage, this);
  }

  initMoment(originalMessage) {
    const self = this.parent;
    const moments = require('../components/moments');
    moments.initMoment(originalMessage, self);
  }

  deleteMoment(originalMessage) {
    const self = this.parent;
    const moments = require('../components/moments');
    moments.deleteMoment(originalMessage, this);
  }

  getMomentBlame(originalMessage) {
    const self = this.parent;
    const moments = require('../components/moments');
    moments.getMomentBlame(originalMessage, self);
  }

  respond(originalMessage) {
    if (originalMessage.text.indexOf('add') !== -1) {
      this.addMoment(originalMessage);
    } else if(originalMessage.text.indexOf('delete') !== -1) {
      if (originalMessage.user === config.meID) {
        this.deleteMoment(originalMessage);
        console.log("deleted")
      } else {
        this.simpleDenki(originalMessage, "!no");
      }
    } else if(originalMessage.text.indexOf('blame') !== -1) {
      this.getMomentBlame(originalMessage);
    } else if(originalMessage.text.indexOf('init') !== -1) {
      if (originalMessage.user === config.meID) {
        this.initMoment(originalMessage);
        console.log("initialize database complete")
      } else {
        this.simpleDenki(originalMessage, "!no");
      }
    } else {
      this.getMoment(originalMessage);
    }
  }
}

module.exports = Moments;
