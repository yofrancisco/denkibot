const natural = require('natural');
const table = require('text-table');
const config = require('../config');

function addMoment(originalMessage, originalSelf) {
  const self = originalSelf.parent;
  const regexNumber = /\d+/;
  const regexUserID = /\<@(.*?)\>/i;
  let messaji = (originalMessage.text);

  // this.keywords = ['!memory', '!memories', '!mangoquotes', '!mangomemories', '!mangomoments', '!moments'];
  messaji = messaji.replace(/!mangoquotes/, "");
  messaji = messaji.replace(/!mangomemories/, "");
  messaji = messaji.replace(/!mangomoments/, "");
  messaji = messaji.replace(/!memory/, "");
  messaji = messaji.replace(/!memories/, "");
  messaji = messaji.replace(/!moments/, "");
  messaji = messaji.replace(/add/, "");
  messaji = messaji.trim();
  console.log(messaji);

  self.simpleDenki(originalMessage, `<@${self.getUsernameById(originalMessage.user)}> ADDED "${messaji}" to mangomoments `);

  self.db.serialize(() => {
    self.db.run(
      `insert into mangomoments values
      (null,
      (select user_id from users where user_id='${originalMessage.user}'),
      ${new Date().getTime()},
      "${messaji}")`
    );
    return;
  });
}

function deleteMoment(originalMessage, originalSelf) {
  const self = originalSelf.parent;
  let messaji = (originalMessage.text);
  messaji = messaji.replace(/!mangoquotes/, "");
  messaji = messaji.replace(/!mangomemories/, "");
  messaji = messaji.replace(/!mangomoments/, "");
  messaji = messaji.replace(/!memory/, "");
  messaji = messaji.replace(/!memories/, "");
  messaji = messaji.replace(/!moments/, "");
  messaji = messaji.replace(/delete/, "");
  messaji = messaji.trim();

  const momentNo = parseInt(messaji, 10);
  console.log(momentNo);

  if(momentNo) {
    self.db.all(
      `
      select mangomoment, no_id
      from mangomoments
      where no_id = '${momentNo}'
      limit 1
      `,
      (err, moment) => {
        console.log(moment);
        if(moment.length > 0) {
          self.simpleDenki(originalMessage, `<@${self.getUsernameById(originalMessage.user)}> DELETED _#${moment[0].no_id}._ ${moment[0].mangomoment}`);

          self.db.serialize(() => {
            self.db.run(
              `
              delete from mangomoments
              where no_id = '${momentNo}';
              `
            );
            return;
          });
        } else {
          self.simpleDenki(originalMessage, `moment not found`);
        }
      });
  }
}

function getMoment(originalMessage, self) {
  let messaji = (originalMessage.text);
  messaji = messaji.replace(/!mangoquotes/, "");
  messaji = messaji.replace(/!mangomemories/, "");
  messaji = messaji.replace(/!mangomoments/, "");
  messaji = messaji.replace(/!memory/, "");
  messaji = messaji.replace(/!memories/, "");
  messaji = messaji.replace(/!moments/, "");
  messaji = messaji.replace(/add/, "");
  messaji = messaji.trim();

  const momentNo = parseInt(messaji, 10);
  console.log(momentNo);

  if(originalMessage.text.indexOf('last') !== -1){
    self.db.all(
      `
      select mangomoment, no_id
      from mangomoments order by no_id desc
      limit 1
      `,
      (err, moment) => {
        console.log(moment);
        self.simpleDenki(originalMessage, `<@${self.getUsernameById(originalMessage.user)}> _#${moment[0].no_id}._ ${moment[0].mangomoment}`);
      });

  } else if(momentNo && (originalMessage.user === config.meID)) {
    self.db.all(
      `
      select mangomoment, no_id
      from mangomoments
      where no_id = '${momentNo}'
      limit 1
      `,
      (err, moment) => {
        console.log(moment);
        if(moment.length > 0) {
          self.simpleDenki(originalMessage, `<@${self.getUsernameById(originalMessage.user)}> _#${moment[0].no_id}._ ${moment[0].mangomoment}`);
        } else {
          self.db.all(
            `
            select mangomoment, no_id
            from mangomoments
            order by random()
            limit 1
            `,
            (err, moment) => {
              console.log(moment);
              self.simpleDenki(originalMessage, `<@${self.getUsernameById(originalMessage.user)}> _#${moment[0].no_id}._ ${moment[0].mangomoment}`);
            });
        }
      });
  } else {
    self.db.all(
      `
      select mangomoment, no_id
      from mangomoments
      order by random()
      limit 1
      `,
      (err, moment) => {
        console.log(moment);
        self.simpleDenki(originalMessage, `<@${self.getUsernameById(originalMessage.user)}> _#${moment[0].no_id}._ ${moment[0].mangomoment}`);
      });
  }
}

function initMoment(originalMessage, self) {
  const initMoments = [
    '_that one time we added denkibot and our lives were changed forever_',
  ];

  self.db.serialize(() => {
    initMoments.forEach((element) => {
      self.db.run(
        `insert into mangomoments values
        (null,
        (select user_id from users where user_id='${originalMessage.user}'),
        ${new Date().getTime()},
        "${element}")`
      );
    });
    return;
  });
}

exports.addMoment = (originalMessage, self) => {
  addMoment(originalMessage, self);
}

exports.getMoment = (originalMessage, self) => {
  getMoment(originalMessage, self);
}

exports.deleteMoment = (originalMessage, self) => {
  deleteMoment(originalMessage, self);
}

exports.initMoment = (originalMessage, self) => {
  initMoment(originalMessage, self);
}
