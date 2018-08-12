const Discord = require('discord.js');
const config = require('./config');
const fs = require('fs');
const path = require('path');

const client = new Discord.Client();

const commands = [];

fs.readdirSync(fs.realpathSync('./discord/commands')).forEach(command => {
  const _path = path.join(fs.realpathSync('./discord/commands'), command);
  if (path.extname(_path) === '.js') {
    const _command = require(_path);
    console.log(`Loaded command ${_path}`);
    commands.push(new _command(this));
  }
});

// const client = new Discord.Client({
//   token: 'MjgwMzAzMTM2MDk3NDM1NjQ4.DlFymQ.2UNXi1Te7sNTUaZktnZb9rl4a1k',
//   autorun: true,
// });
//
// client.on('ready', () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

const _command = require('./commands/coinflip');
const command = new _command();

client.on('message', msg => {
  if (msg.content.indexOf('!') !== -1) {
    // msg.reply('Pong!');
    commands.forEach(command => {
      command.keywords.forEach(keyword => {
        if (msg.content.indexOf(keyword) !== -1) {
          console.log(`responding: ${command.name}, with command: ${keyword}`);
          command.respond(msg);
        }
      });
    });
  }
});

client.login(config.botToken);
