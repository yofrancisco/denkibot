'use strict';

const DenkibotCommand = require('../DenkibotCommand');

const htmlparser = require('htmlparser2');
const select = require('soupselect').select;

class SiteOfTheDay extends DenkibotCommand {
  constructor(parent) {
    super(parent);
    this.keywords = ['!site'];
    this.name = '!site';
  }

  extractData(dom) {
    const collection = select(
      dom,
      '.box-site-head .box-bl .bt-default.green-fill',
    );
    // console.log('testing', collection);
    // console.log('testing', collection[0].attribs.href);

    return collection[0].attribs.href;
  }

  respond({ originalMessage }) {
    // const self = this.parent;

    const request = require('request'),
      url = `https://www.awwwards.com/`;

    request(url, (error, response, body) => {
      const htmlHandler = new htmlparser.DefaultHandler((error, dom) => {
        if (error) {
          console.log('error', error);
          process.exit(1);
        }
        const siteOfTheDay = this.extractData(dom);

        this.simpleDenki({
          originalMessage,
          message: `Site of the day: ${siteOfTheDay}`,
        });
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
  }
}

module.exports = SiteOfTheDay;
