/*
 * denkibot.js
 */
'use strict';

const Denkibot = require('./lib/denki');
const config = require('./config');


const denkibot = new Denkibot({
  botToken: config.botToken,
  dbPath: config.dbPath,
  name: config.botName
});

denkibot.run();
