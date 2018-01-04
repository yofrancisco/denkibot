//
//  denki.js
//

const util = require('util');
const path = require('path');
const fs = require('fs');
const SQLite = require('sqlite3').verbose();
const RtmClient = require('@slack/client').RtmClient;
const WebClient = require('@slack/client').WebClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const MemoryDataStore = require('@slack/client').MemoryDataStore;
const initializeDatabase = require('./initialize-database');
const config = require('../config');

const Denkibot = function Constructor(settings) {
  this.settings = settings;
  this.settings.name = this.settings.name || 'denkibot';
  this.dbPath = settings.dbPath;
  this.db = null;
  this.user = null;
  this.commands = [];
  this.rtmStartData = null;
  this.denkibot = new RtmClient(this.settings.botToken, {
    logLevel: 'error',
    dataStore: new MemoryDataStore(),
    autoReconnect: true,
    autoMark: true,
  });
  this.denkibotEX = new WebClient(this.settings.botToken); // more methods with webclient

  fs.readdirSync(fs.realpathSync('./src/commands')).forEach(command => {
    const _path = path.join(fs.realpathSync('./src/commands'), command);
    if (path.extname(_path) === '.js') {
      const _command = require(_path);
      console.log(`Loaded command ${_path}`);
      this.commands.push(new _command(this));
    }
  });
};

Denkibot.prototype.run = function() {
  // The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload if you want to cache it

  const self = this;
  this.denkibot.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function(rtmStartData) {
    // console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
    // console.log(rtmStartData.users);
    self.rtmStartData = rtmStartData;
    self.initializeDatabase();
  });

  this.denkibot.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function() {
    console.log('fully connected ~ denki can now respond');
    self.respond();
  });

  this.denkibot.start();
};

Denkibot.prototype.initializeDatabase = function() {
  console.log(`Initializing Database path: "${this.dbPath}"`);
  this.db = new SQLite.Database(this.dbPath);

  // Make delete and cascade work.
  this.db.run('PRAGMA foreign_keys = ON');

  initializeDatabase.userSCHEMA().forEach(schema => {
    this.db.run(schema);
  });

  const self = this;
  this.db.get('select * from users limit 1', (err, row) => {
    if (row === undefined) {
      // Result set is empty, initialize this table since other tables depend
      // on it.
      this.db.serialize(() => {
        const statement = this.db.prepare('insert into users values (?, ?)');
        self.rtmStartData.users.forEach(user => {
          statement.run([user.id, user.name]);
        });
        statement.finalize();
      });
    }
  });

  initializeDatabase.componentsSCHEMA().forEach(schema => {
    this.db.run(schema);
  });
};

Denkibot.prototype.simpleDenki = function(originalMessage, message) {
  const self = this;
  this.denkibotEX.chat.postMessage(originalMessage.channel, `${message}`, {
    as_user: true,
  });
};

Denkibot.prototype.betterDenki = function({
  channelName,
  originalMessage,
  message,
  options,
}) {
  const self = this;
  this.denkibotEX.chat.postMessage(channelName, `${message}`, {
    as_user: true,
    ...options,
  });
};

Denkibot.prototype.confuseDenki = function(
  originalMessage,
  channelName,
  command,
) {
  const self = this;
  const message = originalMessage.text.replace(`!${command}`, '');

  this.denkibotEX.chat.postMessage(channelName, `${message}`, {
    as_user: true,
  });
};

Denkibot.prototype.kill = function(originalMessage) {
  const self = this;
  this.denkibot.sendMessage('why...', originalMessage.channel);
  process.exit();
};

Denkibot.prototype.getUsernameById = function(id) {
  const gotUser = this.rtmStartData.users.find(user => user.id === id);
  return gotUser.name;
};

Denkibot.prototype.isFromMe = function(originalMessage) {
  return originalMessage.user === config.meID;
};

Denkibot.prototype.respond = function() {
  const self = this;

  this.denkibot.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(
    originalMessage,
  ) {
    console.log('Message:', originalMessage);
    // console.log('Text:', originalMessage.text);
    // Commands
    // Check if type is message, calls denkibot and isn't from another bot/self
    if (
      originalMessage.text !== undefined &&
      originalMessage.text.indexOf('!') !== -1 &&
      originalMessage.bot_id === undefined
    ) {
      if (
        originalMessage.text.indexOf('!actualkill') !== -1 &&
        originalMessage.user === config.meID
      ) {
        self.kill(originalMessage);
      }
      self.commands.forEach(command => {
        command.keywords.forEach(keyword => {
          if (originalMessage.text.indexOf(keyword) !== -1) {
            console.log(
              `responding: ${command.name}, with command: ${keyword}`,
            );
            command.respond(originalMessage);
          }
        });
      });
    }
  });
};

module.exports = Denkibot;
