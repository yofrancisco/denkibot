const natural = require('natural');
const table = require('text-table');
const lodash = require('lodash');

function getListOfLists(originalMessage, self) {
  self.db.all(
    `
    select list
    from lists
    group by list
    `,
    (err, listsresults) => {
      console.log(listsresults);
      const data = listsresults.map((list, index) => [list.list]);
      if (data.length === 0) {
        self.simpleDenki(
          originalMessage,
          `<@${self.getUsernameById(
            originalMessage.user,
          )}> \`!list <list> add <listItem>\` to create a list`,
        );
      } else {
        self.simpleDenki(
          originalMessage,
          `<@${originalMessage.user}> \`\`\`Lists:\n${table(data)}\`\`\``,
        );
      }
    },
  );
}

function insertListItem(originalMessage, self) {
  const regex = /add(.*)/;

  const list = lodash.escape(
    originalMessage.text
      .split('add')[0]
      .replace(/!list/, '')
      .trim(),
  );
  const listItem = lodash.escape(originalMessage.text.split(regex)[1].trim());
  console.log(list);
  console.log(listItem);

  self.db.serialize(() => {
    self.db.run(
      `insert into lists values
        (null,
        '${list}',
        '${listItem}',
        (select user_id from users where user_id='${originalMessage.user}'),
        ${new Date().getTime()})`,
    );
    return;
  });

  self.simpleDenki(
    originalMessage,
    `<@${lodash.unescape(
      originalMessage.user,
    )}> added \`\`\`\n${lodash.unescape(listItem)}\`\`\` to list \`${list}\``,
  );
}

function deleteListItem(originalMessage, self) {
  const list = lodash
    .escape(originalMessage.text)
    .split('delete')[0]
    .replace(/!list/, '')
    .trim();

  const listItemNo = parseInt(
    originalMessage.text.split('delete')[1].trim(),
    10,
  );

  if (listItemNo && listItemNo >= 0) {
    self.db.serialize(() => {
      self.db.run(
        `
        delete
        from lists
        where no_id
        in (
          select no_id
          from lists
          where list = '${list}'
          limit 1
          offset ${listItemNo - 1}
        );
      `,
      );
      return;
    });

    self.simpleDenki(
      originalMessage,
      `<@${lodash.unescape(
        originalMessage.user,
      )}> deleted \`#${listItemNo}\` to list \`${list}\``,
    );
  } else {
    self.simpleDenki(originalMessage, `<@${originalMessage.user}> ERROR`);
  }
}

function getList(originalMessage, self) {
  const list = lodash
    .escape(originalMessage.text)
    .replace(/!list/, '')
    .trim();

  self.db.all(
    `
    select no_id, list, listitem, user_id
    from lists
    where list = '${list}'
    `,
    (err, listresults) => {
      console.log(listresults);
      const data = listresults.map((listresult, index) => [
        `${index + 1}.`,
        lodash.unescape(listresult.listitem),
      ]);
      if (data.length === 0) {
        self.simpleDenki(
          originalMessage,
          `<@${self.getUsernameById(
            originalMessage.user,
          )}> \`!list <list> add <listItem>\` to create this list`,
        );
      } else {
        self.simpleDenki(
          originalMessage,
          `<@${originalMessage.user}> \`\`\`${lodash.unescape(
            list,
          )} list items:\n${table(data)}\`\`\``,
        );
      }
    },
  );
}

exports.getListOfLists = (originalMessage, self) => {
  getListOfLists(originalMessage, self);
};

exports.insertListItem = (originalMessage, self) => {
  insertListItem(originalMessage, self);
};

exports.deleteListItem = (originalMessage, self) => {
  deleteListItem(originalMessage, self);
};

exports.getList = (originalMessage, self) => {
  getList(originalMessage, self);
};
