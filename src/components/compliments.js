'use strict';
const items = require('../constants/items');
const adjectives = require('../constants/adjectives');
const names = require('../constants/names');

function generatecompliment() {
  const item = items[Math.floor(Math.random() * items.length)];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const winner = names[Math.floor(Math.random() * names.length)];
  const loser = names[Math.floor(Math.random() * names.length)];

  var compliments = [
    `you ${adjective} today`,
    `you look ${adjective} today`,
    `you really ${adjective} today`,
    `you smell ${adjective}`,
    `you smell ${adjective} ${winner}`,
    `you were really ${adjective} last week`,
    `your ${item} looks ${adjective} today`,
    `your ${item} is ${adjective} today`,
    `you're ${adjective} today`,
    `${winner} has nice ${item}`,
    `${winner} has the best ${item}`,
    `${winner}'s ${item} is ${adjective}`,
    `everything was wrong until ${winner} came along`,
    `no matter what ${winner}, you are always you`,
    `i believe in you ${winner}`,
    `i love you ${winner}`,
    `i love your ${item}, ${winner}`,
    `happy birthday ${winner}`,
    `have you been losing weight, ${winner}?`,
    `${winner} has something nice to say to you ${loser}`,
    `${winner} has a crush on you ${loser}`,
    `${winner} thanks you're cool, ${loser}`,
    `thank you for tolerating ${winner} today`,
    `${winner} loves ${loser}`,
    `${winner} owes ${loser} a dollar`
  ];
  var compliment = compliments[Math.floor(Math.random() * compliments.length)];

  return `${compliment}`;
}

exports.getCompliment = () => {
  return generatecompliment();
}
