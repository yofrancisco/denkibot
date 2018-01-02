'use strict';
// Base class for Denkibot Commands.

const config = require('../config');
const spookycount = [];

class DenkibotCommand {
  constructor(parent) {
    this.parent = parent;
    this.denkibot = parent.denkibot;
    this.denkibotEX = parent.denkibotEX;
    this.keywords = [];
    this.name = '';
    this.spookycount = spookycount;
  }

  respond(originalMessage) {
    this.simpleDenki(originalMessage, '!responding!');
  }

  simpleDenki(originalMessage, message) {
    this.parent.simpleDenki(originalMessage, message);
  }

  confuseDenki(originalMessage, channelName, command) {
    this.parent.confuseDenki(originalMessage, channelName, command);
  }

  coinflip(originalMessage, denkiChoices) {
    const winner =
      denkiChoices[Math.floor(Math.random() * denkiChoices.length)];
    this.parent.simpleDenki(originalMessage, `${winner}`);
  }

  getDenkiTextFile(originalMessage, file) {
    const textfile = require(file);
    const text = textfile.denki();
    this.parent.simpleDenki(originalMessage, `${text}`);
  }

  compliment(originalMessage) {
    const self = this.parent;
    const getCompliment = require('../components/compliments');
    const undertale = require('../components/undertale');
    const compliment = getCompliment.getCompliment();
    const spooky = undertale.getCompliment(originalMessage);
    // const r = Math.random() * 10 + 4;
    const r = Math.random() * 10 + 0;
    if (this.spookycount[`"${originalMessage.user}"`]) {
      this.spookycount[`"${originalMessage.user}"`]++;
    } else {
      this.spookycount[`"${originalMessage.user}"`] = 1;
    }

    console.log(this.spookycount[`"${originalMessage.user}"`]);
    console.log(r);
    if (this.spookycount[`"${originalMessage.user}"`] === 13) {
      const exec = require('child_process').exec;

      const child = exec(
        `cubeify stopit${self.getUsernameById(originalMessage.user)}`,
        function(error, stdout, stderr) {
          console.log(`stdout: ${stdout}`);
          // console.log('stderr: ' + stderr);
          self.simpleDenki(originalMessage, `\`\`\` ${stdout} \`\`\``);
          if (error !== null) {
            console.log(`exec error: ${error}`);
          }
        },
      );
    } else if (this.spookycount[`"${originalMessage.user}"`] === 14) {
      this.getDenkiTextFile(originalMessage, '../constants/stoppls');
      this.spookycount[`"${originalMessage.user}"`] = 1;
    } else if (this.spookycount[`"${originalMessage.user}"`] > r) {
      this.simpleDenki(originalMessage, `${spooky}`);
    } else {
      this.simpleDenki(
        originalMessage,
        `<@${self.getUsernameById(originalMessage.user)}> ${compliment}`,
      );
    }
  }
}

module.exports = DenkibotCommand;
