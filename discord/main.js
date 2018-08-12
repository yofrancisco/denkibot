const Discord = require('discord.js');
const config = require('./config');
const fs = require('fs');
const path = require('path');

const client = new Discord.Client();

const commands = [];

fs.readdirSync(fs.realpathSync('./commands')).forEach(command => {
  const _path = path.join(fs.realpathSync('./commands'), command);
  if (path.extname(_path) === '.js') {
    const _command = require(_path);
    console.log(`Loaded command ${_path}`);
    commands.push(new _command({ environment: 'DISCORD' }));
  }
});

client.on('message', msg => {
  if (!msg.author.bot) {
    if (msg.content.indexOf('!') !== -1) {
      commands.forEach(command => {
        command.keywords.forEach(keyword => {
          if (msg.content.indexOf(keyword) !== -1) {
            console.log(
              `responding: ${command.name}, with command: ${keyword}`,
            );
            command.respond({
              originalMessage: msg,
              originalText: msg.content,
            });
          }
        });
      });
    }
  }
});

client.login(config.botToken);
