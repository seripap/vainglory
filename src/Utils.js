import moment from 'moment';
import BaseModel from './models/';
import MatchModel from './models/match';
import ParticipantModel from './models/participant';
import PlayerModel from './models/player';
import RosterModel from './models/roster';

function parseTime(time) {
  const normalizedTime = time.trim().toLowerCase().split(' ');
}

// export default {
//   models: {
//     BaseModel,
//     MatchModel,
//     ParticipantModel,
//     PlayerModel,
//     RosterModel,
//   },
//   time: {
//     parseTime,
//   },
// }
