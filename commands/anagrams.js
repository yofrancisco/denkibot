'use strict';

const DenkibotCommand = require('../DenkibotCommand');

const htmlparser = require('htmlparser2');
const select = require('soupselect').select;

class Anagram extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!anagram'];
    this.name = '!anagram';
  }

  extractData(dom) {
    const nagarams = [];
    const collection = select(dom, '.p402_premium p');

    collection[1].children.forEach(word => {
      if (word.type === 'text' && word.data !== '\n') {
        nagarams.push(word.data.replace(/\n/g, ''));
      }
    });

    console.log(nagarams);
    return nagarams;
  }

  respond({ originalMessage, originalText }) {
    // const self = this.parent;
    let messaji = originalText;
    messaji = messaji.replace('!anagram', '');
    messaji = messaji.replace(/\W/g, '');
    messaji = messaji.replace(/[^0-9a-z]/gi, '');
    messaji = messaji.replace(/[0-9]/g, '');
    messaji = messaji.trim();

    console.log(`anagramming ${messaji}`);
    if (messaji !== '' && messaji.length <= 26) {
      const request = require('request'),
        url = `https://wordsmith.org/anagram/anagram.cgi?anagram=${messaji}`;

      request(url, (error, response, body) => {
        const htmlHandler = new htmlparser.DefaultHandler((error, dom) => {
          if (error) {
            console.log('error', error);
            process.exit(1);
          }
          const nagarams = this.extractData(dom);

          this.coinflip({ originalMessage, denkiChoices: nagarams });
        });
        const parser = new htmlparser.Parser(htmlHandler);

        if (!error && response.statusCode === 200) {
          const data = body;
          // console.log("Got a response: ", body)
          parser.parseComplete(body);
          // this.simpleDenki(originalMessage, `ATB has raised $${parseInt(data.amount_raised)} helping ${parseInt(data.amount_raised / 576)} smithy's in need :smithy:`);
          return;
        } else {
          console.log(
            'Got an error: ',
            error,
            ', status code: ',
            response.statusCode,
          );
        }
      });
    } else {
      this.simpleDenki({
        originalMessage,
        message: this.parent
          ? `<@${this.parent.getUsernameById(
              originalMessage.user,
            )}> no ${messaji}`
          : `no ${messaji}`,
      });
    }
  }
}

module.exports = Anagram;
