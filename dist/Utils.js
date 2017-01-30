'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = {
  models: {
    BaseModel: _models2.default,
    MatchModel: _match2.default,
    ParticipantModel: _participant2.default,
    PlayerModel: _player2.default,
    RosterModel: _roster2.default
  }
};