'use strict';

const userSCHEMA = [
  `
create table if not exists users (
  user_id varchar(255) not null,
  name varchar(255) not null,
  primary key (user_id)
);
`,
];

const componentsSCHEMA = [
  `
create table if not exists denkipoints (
  user_id varchar(255) not null,
  awarded_at datetime not null,
  points integer not null,
  foreign key (user_id) references users(user_id)
  on delete cascade on update cascade,
  primary key(user_id, awarded_at)
);
`,
  `
create table if not exists sneezepoints (
  user_id varchar(255) not null,
  awarded_at datetime not null,
  points integer not null,
  foreign key (user_id) references users(user_id)
  on delete cascade on update cascade,
  primary key(user_id, awarded_at)
);
`,
  `
create table if not exists heartpoints (
  user_id varchar(255) not null,
  friend_id varchar(255) not null,
  awarded_at datetime not null,
  awarded_date date not null,
  hearts integer not null,
  gift varchar(255),
  foreign key (user_id) references users(user_id),
  foreign key (friend_id) references users(user_id)
  on delete cascade on update cascade,
  primary key(user_id, friend_id, awarded_at)
);
`,
  `
create table if not exists mangomoments (
  no_id integer primary key autoincrement,
  user_id varchar(255) not null,
  date_added datetime not null,
  mangomoment varchar(255),
  foreign key (user_id) references users(user_id)
  on delete cascade on update cascade
);
`,
];

exports.userSCHEMA = () => userSCHEMA;
exports.componentsSCHEMA = () => componentsSCHEMA;
