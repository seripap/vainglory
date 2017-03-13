import Base from './models';
import Match from './models/match';
import Matches from './models/matches';
import Participant from './models/participant';
import Player from './models/player';
import Roster from './models/roster';

export function encodePlayerNames(playerNames) {
  return playerNames.map(player => encodeURIComponent(player))
}

export default {
  models: {
    Base,
    Match,
    Matches,
    Participant,
    Player,
    Roster,
  }
}
