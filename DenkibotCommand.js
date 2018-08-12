'use strict';
// Base class for Denkibot Commands.

const spookycount = [];

const defaultMessageOptions = {
  reply: false,
};

const environments = {
  discord: 'DISCORD',
  slack: 'SLACK',
};

class DenkibotCommand {
  constructor({ parent, environment }) {
    this.parent = parent;
    this.environment = environment;
    this.keywords = [];
    this.name = '';
    this.spookycount = spookycount;
  }

  respond({ originalMessage, originalText, message }) {
    if (this.environment === environments.discord) {
      originalMessage.reply('!responding!', defaultMessageOptions);
    }
    if (this.environment === environments.slack) {
      this.parent.simpleDenki({ originalMessage, message });
    }
  }

  simpleDenki({ originalMessage, message }) {
    if (this.environment === environments.discord) {
      originalMessage.reply(message, defaultMessageOptions);
    }
    if (this.environment === environments.slack) {
      this.parent.simpleDenki({ originalMessage, message });
    }
  }

  coinflip({ originalMessage, denkiChoices }) {
    const winner =
      denkiChoices[Math.floor(Math.random() * denkiChoices.length)];

    if (this.environment === environments.discord) {
      originalMessage.reply(`${winner}`, defaultMessageOptions);
    }
    if (this.environment === environments.slack) {
      this.parent.simpleDenki({ originalMessage, message: `${winner}` });
    }
  }

  getDenkiTextFile({ originalMessage, file }) {
    const textfile = require(file);
    const text = textfile.denki();
    if (this.environment === environments.discord) {
      originalMessage.reply(`${text}`, defaultMessageOptions);
    }
    if (this.environment === environments.slack) {
      this.parent.simpleDenki({
        originalMessage: originalMessage,
        message: `${text}`,
      });
    }
  }

  confuseDenki({ originalMessage, channelName, command }) {
    if (this.environment === environments.slack) {
      this.parent.confuseDenki({ originalMessage, channelName, command });
    }
  }

  compliment({ originalMessage }) {
    const self = this.parent;
    const getCompliment = require('./components/compliments');
    const undertale = require('./components/undertale');
    const compliment = getCompliment.getCompliment();
    const spooky = undertale.getCompliment(originalMessage);
    // const r = Math.random() * 10 + 4;

    if (this.environment === environments.discord) {
      this.simpleDenki({
        originalMessage,
        message: `${compliment}`,
      });
    }

    if (this.environment === environments.slack) {
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
        this.getDenkiTextFile({
          originalMessage,
          file: '../constants/stoppls',
        });
        this.spookycount[`"${originalMessage.user}"`] = 1;
      } else if (this.spookycount[`"${originalMessage.user}"`] > r) {
        this.simpleDenki({ originalMessage, message: `${spooky}` });
      } else {
        this.simpleDenki({
          originalMessage,
          message: `<@${self.getUsernameById(
            originalMessage.user,
          )}> ${compliment}`,
        });
      }
    }
  }
}

module.exports = DenkibotCommand;
