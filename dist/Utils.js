'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _match = require('./models/match');

var _match2 = _interopRequireDefault(_match);

var _matches = require('./models/matches');

var _matches2 = _interopRequireDefault(_matches);

var _participant = require('./models/participant');

var _participant2 = _interopRequireDefault(_participant);

var _player = require('./models/player');

var _player2 = _interopRequireDefault(_player);

var _roster = require('./models/roster');

var _roster2 = _interopRequireDefault(_roster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  models: {
    Base: _models2.default,
    Match: _match2.default,
    Matches: _matches2.default,
    Participant: _participant2.default,
    Player: _player2.default,
    Roster: _roster2.default
  }
};