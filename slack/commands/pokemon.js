'use strict';

const DenkibotCommand = require('../DenkibotCommand');
const config = require('../config');
const pokemon = require('pokemon');

class Pokemon extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!pokemon', '!digimon'];
    this.name = '!pokemon';
  }

  pokemon(originalMessage) {
    const self = this.parent;
    let messaji = originalMessage.text;
    messaji = messaji.replace('!pokemon', '');
    messaji = messaji.replace('!digimon', '');
    messaji = messaji.trim();

    if (messaji.length > 0) {
      if (messaji.match(/^[0-9]+$/) !== null) {
        try {
          if (pokemon.getName(parseInt(messaji))) {
            self.simpleDenki(
              originalMessage,
              `It's ${pokemon.getName(parseInt(messaji))}`,
            );
          }
        } catch (err) {
          self.simpleDenki(originalMessage, `It's ${pokemon.random()}`);
        }
      } else {
        try {
          // console.log(messaji);
          messaji = messaji.toLowerCase();
          messaji = messaji.charAt(0).toUpperCase() + messaji.slice(1);
          // console.log(messaji);
          if (pokemon.getId(messaji)) {
            self.simpleDenki(
              originalMessage,
              `#${pokemon.getId(messaji)} It's ${messaji}`,
            );
          }
        } catch (err) {
          self.simpleDenki(originalMessage, `It's ${pokemon.random()}`);
        }
      }
    } else {
      self.simpleDenki(originalMessage, `It's ${pokemon.random()}`);
    }
  }

  respond(originalMessage) {
    this.pokemon(originalMessage);
  }
}

module.exports = Pokemon;
