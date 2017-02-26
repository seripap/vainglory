/**
 * better examples coming soon!
 */

import Vainglory from '../src/Vainglory';
const vainglory = new Vainglory('your-api-key');

const matchId = 'f31b614a-fbbb-11e6-9ec9-062445d3d668';
vainglory.matches.single(matchId).then((match) => {
  // do something with matches
  console.log(match);
}).catch((err) => console.error(err));


const playerId = '6abb30de-7cb8-11e4-8bd3-06eb725f8a76';
vainglory.players.single(playerId).then((player) => {
  console.log(`${player.name} is player ID ${player.id} and has a lifetime gold of ${player.stats.lifetimeGold}`);
}).catch((errorMsg) => {
  console.error(errorMsg);
});
