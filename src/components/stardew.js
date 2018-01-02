const natural = require('natural');
const table = require('text-table');
const heartMultiplier = 1;

function calcHearts(originalMessage, self) {
  let hearts = 1;
  let emoji = ':heart_eyes_cat:';
  const regexNumber = /\d+/;
  const regexUserID = /\<@(.*?)\>/gi;
  const messaji = originalMessage.text.replace(regexUserID, '');

  if (regexNumber.test(messaji)) {
    hearts = parseInt(messaji.match(regexNumber)[0]);
  }

  if (originalMessage.text.indexOf('-') !== -1) {
    hearts = hearts * -1;
    emoji = ':skull_and_crossbones:';
  }

  self.db.each('select * from users', (err, row) => {
    // console.log(row);
    if (
      originalMessage.text.indexOf(`${self.getUsernameById(row.user_id)}`) !==
        -1 ||
      originalMessage.text.indexOf(`${row.user_id}`) !== -1
    ) {
      self.simpleDenki(
        originalMessage,
        `<@${self.getUsernameById(
          originalMessage.user,
        )}> ${emoji} <@${self.getUsernameById(row.user_id)}>`,
      );

      self.db.serialize(() => {
        self.db.run(
          `insert into heartpoints values
          ((select user_id from users where user_id='${originalMessage.user}'),
          (select user_id from users where user_id='${row.user_id}'),
          ${new Date().getTime()},
          (select date()),
          ${hearts},
          null)`,
        );
        getFriendship(originalMessage, row, self);
        return;
      });
    }
  });
}

function gift(originalMessage, self) {
  let hearts = 1;
  let emoji = ':watermelon:';
  const regexNumber = /\d+/;
  const regexUserID = /\<@(.*?)\>/i;
  let messaji = originalMessage.text.replace(regexUserID, '');
  messaji = messaji.replace(/gift/, '');
  messaji = messaji.replace(/\!/, '');
  console.log(messaji);

  if (regexNumber.test(messaji)) {
    hearts = parseInt(messaji.match(regexNumber)[0]);
  }

  if (originalMessage.text.indexOf('-') !== -1) {
    hearts = hearts * -1;
    emoji = ':hankey:';
  }

  self.db.each('select * from users', (err, row) => {
    // console.log(row);
    if (
      originalMessage.text.indexOf(`${self.getUsernameById(row.user_id)}`) !==
        -1 ||
      originalMessage.text.indexOf(`${row.user_id}`) !== -1
    ) {
      messaji = messaji
        .replace(`${self.getUsernameById(row.user_id)}`, '')
        .trim();
      console.log(messaji);
      self.simpleDenki(
        originalMessage,
        `<@${self.getUsernameById(
          originalMessage.user,
        )}> gifted <@${self.getUsernameById(row.user_id)}> ${messaji} ${emoji}`,
      );

      self.db.serialize(() => {
        self.db.run(
          `insert into heartpoints values
          ((select user_id from users where user_id='${originalMessage.user}'),
          (select user_id from users where user_id='${row.user_id}'),
          ${new Date().getTime()},
          (select date()),
          ${hearts},
          "${messaji}")`,
        );
        getFriendship(originalMessage, row, self);
        return;
      });
    }
  });
}

function friendships(originalMessage, self) {
  let user_id = originalMessage.user;
  const messaji = originalMessage.text;

  const regexUserID = /\<@(.*?)\>/i;
  if (regexUserID.test(messaji)) {
    user_id = messaji.match(regexUserID)[0].replace(/[@<>]/g, '');
    console.log(user_id);
  }

  self.db.all(
    `
    select
      user_id,
      friend_id,
      sum(hearts) as hearts,
      sum(case when (gift is not null) and (awarded_date between (date()-7) and (date())) and (originalfriend_id != '${user_id}') then 1 else 0 end) as gift
      from (
        select user_id, friend_id, awarded_date, hearts, gift, friend_id as originalfriend_id
          from heartpoints
          union all
          select friend_id as user_id, user_id as friend_id, awarded_date, hearts, gift, friend_id as originalfriend_id
            from heartpoints
            where user_id != friend_id
        )
      where user_id = '${user_id}'
      group by user_id, friend_id
      order by hearts desc
    `,
    (err, heartpoints) => {
      // console.log(`${heartpoints.length} ${heartpoints}`);
      console.log(heartpoints);
      const data = heartpoints.map(heartpointsUser => {
        const name = self.getUsernameById(heartpointsUser.friend_id);
        let totalhearts = parseInt(heartpointsUser.hearts * heartMultiplier);
        if (totalhearts > 10) {
          totalhearts = 10;
        }
        if (totalhearts < 0) {
          totalhearts = 0;
        }
        // const heartString = "❤".repeat(totalhearts);
        const heartString = '♥'.repeat(totalhearts);
        const emptyHeartString = '♡'.repeat(10 - totalhearts);

        let totalGifts = parseInt(heartpointsUser.gift);
        if (totalGifts > 2) {
          totalGifts = 2;
        }
        if (totalGifts < 0) {
          totalGifts = 0;
        }

        const giftString = '☑'.repeat(totalGifts);
        const emptyGiftString = '☐'.repeat(2 - totalGifts);
        const presentEmoji = '🎁';
        return [
          name,
          heartString + emptyHeartString,
          parseInt(heartpointsUser.hearts * heartMultiplier),
          presentEmoji + giftString + emptyGiftString,
        ];
      });
      if (heartpoints.length === 0) {
        self.simpleDenki(
          originalMessage,
          `<@${self.getUsernameById(
            user_id,
          )}> \`!heart <user>\` to start your journey`,
        );
      } else {
        self.simpleDenki(
          originalMessage,
          `<@${user_id}>'s heartpoints: \`\`\`\n${table(data)}\`\`\``,
        );
      }
    },
  );
}

function getFriendship(originalMessage, friend_row, self) {
  self.db.all(
    `
    select user_id, friend_id, sum(hearts) as hearts
      from (
        select user_id, friend_id, hearts
          from heartpoints
          union all
          select friend_id as user_id, user_id as friend_id, hearts
            from heartpoints
            where user_id != friend_id
        )
      where user_id = '${originalMessage.user}' and friend_id = '${friend_row.user_id}'
      group by user_id, friend_id
      order by hearts desc
    `,
    (err, heartpoints) => {
      totalHeartpoints = parseInt(heartpoints[0].hearts * heartMultiplier);
      // console.log(heartpoints);
      // console.log(totalHeartpoints);
      if (
        originalMessage.text.indexOf('-') === -1 &&
        totalHeartpoints % 2 === 0 &&
        totalHeartpoints > 0 &&
        totalHeartpoints <= 10
      ) {
        self.simpleDenki(
          originalMessage,
          `<@${self.getUsernameById(
            originalMessage.user,
          )}> a new cutscene awaits you`,
        );
      }
    },
  );
}

exports.calcHearts = (originalMessage, self) => {
  calcHearts(originalMessage, self);
};

exports.friendships = (originalMessage, self) => {
  friendships(originalMessage, self);
};

exports.gift = (originalMessage, self) => {
  gift(originalMessage, self);
};
