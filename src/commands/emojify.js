'use strict';

const DenkibotCommand = require('../lib/command.js');

class Emojify extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!emojify'];
    this.name = '!emojify';
  }

  respond(originalMessage) {
    if(originalMessage.text.match(/:(.*?):/)){
      const self = this.parent;
      let messaji = originalMessage.text;
      messaji = messaji.replace('!emojify', '');
      const emoji = messaji.match(/:(.*?):/)[1];
      messaji = messaji.replace(`:${emoji}:`, '');
      messaji = messaji.trim();
      messaji = messaji.replace(/ /g, ` :${emoji}: `);
      messaji = `:${emoji}: ${messaji} :${emoji}:`;
      this.simpleDenki(originalMessage, `${messaji}`);
    }
  }
}

module.exports = Emojify;
