'use strict';

const text = '\
Try:\
```\r\
!heart <user><++/-->\r\
!friendships\r\
!gift <user>\r\
!denkipoints <user> <amount>\r\
!denkipoints leaderboard\r\
!sneezepoints <user> <amount>\r\
!sneezepoints leaderboard\r\
!compliment\r\
!winner\r\
!loser\r\
!coinflip\r\
!coinflip <options seperated by spaces( ) or commas(,)>\r\
!anagram <input>\r\
!cube <input>\r\
!pokemon\r\
!google <input>\r\
!wiki <input>\r\
!math <input>\r\
!moments\r\
!moments add <input>\r\
!time\r\
!ABORT\r\
```\
';

exports.denki = () => {
  return text;
}
