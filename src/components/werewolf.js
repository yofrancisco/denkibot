const natural = require('natural');
const table = require('text-table');

const defaultGameTime = 5000;

const TEAM_DOPPELGANGER = 'TEAM_DOPPELGANGER';
const TEAM_WEREWOLF = 'TEAM_WEREWOLF';
const TEAM_VILLAGER = 'TEAM_VILLAGER';

const ALPHA_WEREWOLF = 'ALPHA_WEREWOLF';
const DOPPELGANGER = 'DOPPELGANGER ';
const DRUNK = 'DRUNK';
const INSOMINIAC = 'INSOMINIAC';
const MASON = 'MASON';
const MINION = 'MINION';
const MYSTIC_WEREWOLF = 'MYSTIC_WEREWOLF';
const ROBBER = 'ROBBER';
const SEER = 'SEER';
const TROUBLEMAKER = 'TROUBLEMAKER';
const VILLAGER = 'VILLAGER';
const WEREWOLF = 'WEREWOLF';

const defaultRoles = [
  WEREWOLF,
  SEER,
  TROUBLEMAKER,
  ROBBER,
  WEREWOLF,
  VILLAGER,
  MASON,
  MASON,
  ALPHA_WEREWOLF,
];

// in order of role
const roleList = {
  DOPPELGANGER: {
    title: 'Doppelganger',
    team: TEAM_DOPPELGANGER,
    description: 'Action: ',
  },
  WEREWOLF: {
    title: 'Werewolf',
    team: TEAM_WEREWOLF,
    description: 'Action: ',
  },
  ALPHA_WEREWOLF: {
    title: 'Alpha Werewolf',
    team: TEAM_WEREWOLF,
    description: 'Action: ',
  },
  MYSTIC_WEREWOLF: {
    title: 'Mystic Werewolf',
    team: TEAM_WEREWOLF,
    description: 'Action: ',
  },
  MINION: {
    title: 'Minion',
    team: TEAM_WEREWOLF,
    description: 'Action: ',
  },
  MASON: {
    title: 'Mason',
    team: TEAM_VILLAGER,
    description: 'Action: ',
  },
  SEER: {
    title: 'Seer',
    team: TEAM_VILLAGER,
    description: 'Action: ',
  },
  ROBBER: {
    title: 'Robber',
    team: TEAM_VILLAGER,
    description: 'Action: ',
  },
  TROUBLEMAKER: {
    title: 'Troublemaker',
    team: TEAM_VILLAGER,
    description: 'Action: ',
  },
  DRUNK: {
    title: 'Drunk',
    team: TEAM_VILLAGER,
    description: 'Action: ',
  },
  INSOMINIAC: {
    title: 'Insominac',
    team: TEAM_VILLAGER,
    description: 'Action: ',
  },
  VILLAGER: {
    title: 'Villager',
    team: TEAM_VILLAGER,
  },
};

let currentPlayers = ['<@U1BG4CPC4>'];
let currentRoleList = defaultRoles.slice(0, currentPlayers.length + 3);
let gameActive = false;
let timer = undefined;

function reset(originalMessage, self) {
  self.simpleDenki(
    originalMessage,
    `<@${self.getUsernameById(
      originalMessage.user,
    )}> roles have been reset and players have been cleared`,
  );
}

function roles(originalMessage, self) {
  self.simpleDenki(
    originalMessage,
    `<@${self.getUsernameById(
      originalMessage.user,
    )}> the roles are: \`\`\`${currentRoleList
      .map(role => `${role}`)
      .join(', ')}\`\`\``,
  );
}

function setRoles(originalMessage, self) {
  roles(originalMessage, self);
}

function players(originalMessage, self) {
  self.simpleDenki(
    originalMessage,
    `<@${self.getUsernameById(
      originalMessage.user,
    )}> the players are: ${currentPlayers
      .map(player => `${player}`)
      .join(', ')}`,
  );
}

function setPlayers(originalMessage, self) {
  if (originalMessage.text.indexOf(',') !== -1) {
    currentPlayers = originalMessage.text
      .replace('!werewolf setplayers', '')
      .trim()
      .split(',');
  } else {
    currentPlayers = originalMessage.text
      .replace('!werewolf setplayers', '')
      .trim()
      .split(' ');
  }

  if (currentRoleList.length - 3 !== currentPlayers.length) {
    currentRoleList = defaultRoles.slice(0, currentPlayers.length + 3);
  }

  players(originalMessage, self);
}

function getRoleByID(_playerID) {
  let role = undefined;
  let playerID = _playerID.replace(`<@`, '').replace('>', '');

  currentPlayers.map((player, index) => {
    if (player.indexOf(playerID) !== -1) {
      role = currentRoles[index];
    }
  });

  return role;
}

function start(originalMessage, self) {
  currentRoles = currentRoleList.sort(function(a, b) {
    return 0.5 - Math.random();
  });

  if (currentPlayers.length < 0) {
    self.simpleDenki(
      originalMessage,
      `<@${self.getUsernameById(
        originalMessage.user,
      )}> CURRENT PLAYERS MUST EXCEED 3.`,
    );
  } else {
    gameActive = true;

    self.simpleDenki(
      originalMessage,
      `<@${self.getUsernameById(
        originalMessage.user,
      )}> starting - you have been dm'ed your role. follow the actions provided.`,
    );

    currentPlayers.map((player, index) => {
      self.betterDenki({
        channelName: 'U1BG4CPC4',
        originalMessage: originalMessage,
        message: `${player} ${roleList[getRoleByID(player)].description}`,
      });

      self.betterDenki({
        channelName: 'U1BG4CPC4',
        originalMessage: originalMessage,
        message: `${player} Your role is ${getRoleByID(player)}`,
      });
    });
  }
}

function action(originalMessage, self) {
  if (gameActive) {
    currentPlayers.map((player, index) => {
      if (player.indexOf(originalMessage.user) !== -1) {
        self.simpleDenki(
          originalMessage,
          `<@${self.getUsernameById(
            originalMessage.user,
          )}> cool you're in. Your role is ${currentRoles[index]}`,
        );
      }
    });
  } else {
    self.simpleDenki(
      originalMessage,
      `<@${self.getUsernameById(originalMessage.user)}> game not active.`,
    );
  }
}

exports.reset = (originalMessage, self) => {
  init(originalMessage, self);
};

exports.roles = (originalMessage, self) => {
  roles(originalMessage, self);
};

exports.setRoles = (originalMessage, self) => {
  setRoles(originalMessage, self);
};

exports.players = (originalMessage, self) => {
  players(originalMessage, self);
};

exports.setPlayers = (originalMessage, self) => {
  setPlayers(originalMessage, self);
};

exports.start = (originalMessage, self) => {
  start(originalMessage, self);
};

exports.action = (originalMessage, self) => {
  action(originalMessage, self);
};
