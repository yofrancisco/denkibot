'use strict';

const DenkibotCommand = require('../lib/command.js');

class Cube extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!cube', '!cubeify'];
    this.name = '!cubeify';
  }

  cubeify(originalMessage) {
    const self = this.parent;
    const cubeify = require('../components/cubeify');
    let dashed = false;

    if (originalMessage.text.indexOf('-d') !== -1) {
      dashed = true;
    }

    let messaji = originalMessage.text;
    messaji = messaji.replace(/!cubeify/g, '');
    messaji = messaji.replace(/!cube/g, '');
    messaji = messaji.replace(/-dashed/g, '');
    messaji = messaji.replace(/-d/g, '');
    messaji = messaji.replace(/\W/g, '');
    messaji = messaji.replace(/[^0-9a-z]/gi, '')
    messaji = messaji.replace(/[0-9]/g, '');
    messaji = messaji.trim();
    console.log(messaji);

    if (messaji.length > 25) {
      self.simpleDenki(originalMessage, "too long ~ denki can't compute");
    } else {
      self.simpleDenki(originalMessage, `\`\`\`${cubeify.generateCube(messaji, dashed)}\`\`\``);
    }
  }

  respond(originalMessage) {
    this.cubeify(originalMessage);
    return;
  }
}

module.exports = Cube;
