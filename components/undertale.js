'use strict';
const items = require('../constants/items');
const adjectives = require('../constants/adjectives');
const names = require('../constants/names');

function generatecompliment(originalMessage) {
  const item = items[Math.floor(Math.random() * items.length)];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const winner = names[Math.floor(Math.random() * names.length)];
  const loser = names[Math.floor(Math.random() * names.length)];

  var compliments = [
    `Really not feeling complimenting you <@${originalMessage.user}>.`,
    `you feel all your empty compliments crawling up your back <@${originalMessage.user}>.`,
    `you....`,
    `no`,
    `Everyone beware of <@${originalMessage.user}>.`,
    `I can't let you keep doing this <@${originalMessage.user}>.`,
    `This is what I was afraid of... <@${originalMessage.user}>.`,
    `You ask for a compliment... but nothing came.`,
    `<@${originalMessage.user}>'s heartpoints: \`\`\` denkibot: 🖤🖤🖤🖤🖤🖤🖤🖤🖤🖤 🎁🖤🖤\`\`\``,
    `everything was fine until <@${originalMessage.user}> came along.`,
    `This is why I never told you... <@${originalMessage.user}>.`,
    `I... I KNOW WHAT YOU DID <@${originalMessage.user}>.`,
    `You're going to have a bad time <@${originalMessage.user}>.`,
    `Y O U D I R T Y C O M P L I M E N T N A R C I S S I S T`,
    `( ⊙ || ⊙)`,
    `you look into your monitor reflection, it's you.`,
    `You don't want to keep doing this <@${originalMessage.user}>.`,
  ];
  var compliment = compliments[Math.floor(Math.random() * compliments.length)];

  return `${compliment}`;
}

exports.getCompliment = originalMessage => {
  return generatecompliment(originalMessage);
};
