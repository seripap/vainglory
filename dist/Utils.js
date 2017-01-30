'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _models = require('./models/');

var _models2 = _interopRequireDefault(_models);

var _match = require('./models/match');

var _match2 = _interopRequireDefault(_match);

var _participant = require('./models/participant');

var _participant2 = _interopRequireDefault(_participant);

var _player = require('./models/player');

var _player2 = _interopRequireDefault(_player);

var _roster = require('./models/roster');

var _roster2 = _interopRequireDefault(_roster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseTime(time) {
  var normalizedTime = time.trim().toLowerCase().split(' ');
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