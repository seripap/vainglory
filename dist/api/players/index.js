'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _player = require('../../models/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ENDPOINT_PREFIX = 'players';

exports.default = function (http) {
  function single(playerId) {
    return new Promise(function (resolve, reject) {
      if (!playerId) {
        return reject(new Error('Expected required playerId. Usage: .single(playerId)'));
      }

      if (!(0, _isString2.default)(playerId)) {
        return reject(new Error('Expected a string for playerId'));
      }

      var endpoint = ENDPOINT_PREFIX + '/' + playerId;

      return http.execute('GET', endpoint).then(function (body) {
        return resolve(new _player2.default(body));
      }).catch(function (err) {
        return reject(new Error(err));
      });
    });
  }

  return {
    single: single
  };
};