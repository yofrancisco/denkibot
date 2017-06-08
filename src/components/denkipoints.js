const natural = require('natural');
const table = require('text-table');

function calcPoints(originalMessage, self) {
  let points = 1;

  const regex = /\d+/;

  if(regex.test(originalMessage.text)) {
    points = parseInt((originalMessage.text).match(regex)[0]);
  }

  if (originalMessage.text.indexOf('-') !== -1) {
    points = points * -1;
  }

  self.db.each('select * from users', (err, row) => {
    // console.log(row);
    if ((originalMessage.text.indexOf(`${self.getUsernameById(row.user_id)}`) !== -1) || (originalMessage.text.indexOf(`${row.user_id}`) !== -1)) {
      self.simpleDenki(originalMessage, `<@${self.getUsernameById(originalMessage.user)}> i think i understood :+1:`);
      self.db.serialize(() => {
        self.db.run(
          'insert into denkipoints values ' +
          `((select user_id from users where user_id='${row.user_id}'), ` +
          `${new Date().getTime()}, ${points})`
        );
        return;
      });
    }

  });
}

function leaderboard(originalMessage, self) {
  self.db.all(
    'select user_id, sum(points) as points ' +
      'from denkipoints group by user_id ' +
      'order by points desc',
    (err, denkipoints) => {
      const data = denkipoints.map(
        (denkipointsUser) => {
          return [self.getUsernameById(denkipointsUser.user_id), denkipointsUser.points];
        }
      );
      if (data.length === 0) {
        self.simpleDenki(originalMessage, `<@${self.getUsernameById(originalMessage.user)}> \`!denkipoints <user> to initialize\``);
      } else {
        self.simpleDenki(originalMessage, `<@${originalMessage.user}> \`\`\`Denkipoints:\n${table(data)}\`\`\``);
        // console.log(`<@${originalMessage.user}> \`\`\`Denki Points:\n${table(data)}\`\`\``);
      }
    });
}

exports.calcPoints = (originalMessage, self) => {
  calcPoints(originalMessage, self);
}

exports.leaderboard = (originalMessage, self) => {
  leaderboard(originalMessage, self);
}
