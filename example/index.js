/**
 * better examples coming soon!
 */

import Vainglory from '../src/Vainglory';
const vainglory = new Vainglory('your-api-key');

const query = {
  page: {
    offset: 0,
    limit: 20,
  },
  filter: {
    'createdAt-start': '2017-01-01T08:25:30Z',
    playerNames: ['famous'],
  },
};

vainglory.matches.collection(query).then((matches) => {
  console.log(matches);
});

const matchId = 'f31b614a-fbbb-11e6-9ec9-062445d3d668';
vainglory.matches.single(matchId).then((match) => {
  // do something with matches
  console.log(match);
}).catch((err) => console.error(err));


const playerId = '6abb30de-7cb8-11e4-8bd3-06eb725f8a76';
vainglory.players.getById(playerId).then((player) => {
  console.log(`${player.name} is player ID ${player.id} and has a lifetime gold of ${player.stats.lifetimeGold}`);
}).catch((errorMsg) => {
  console.error(errorMsg);
});
