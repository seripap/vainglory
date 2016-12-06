'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isInteger = require('lodash/isInteger');

var _isInteger2 = _interopRequireDefault(_isInteger);

var _isBoolean = require('lodash/isBoolean');

var _isBoolean2 = _interopRequireDefault(_isBoolean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ENDPOINT_PREFIX = 'matches';

exports.default = function (http) {
  // Find a match by which players played
  function searchPlayers(players) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      gameType: 'string',
      actor: 'string',
      startTime: 0,
      endTime: 0
    };

    return new Promise(function (resolve, reject) {
      if (!(0, _isArray2.default)(players)) {
        throw reject(new Error('Expecting array for players'));
      }

      if (!(0, _isString2.default)(options.gameType)) {
        throw reject(new Error('Expecting string for gameType'));
      }

      if (!(0, _isString2.default)(options.actor)) {
        throw reject(new Error('Expecting string for actor'));
      }

      if (!(0, _isInteger2.default)(options.startTime)) {
        throw reject(new Error('Expecting integer for startTime'));
      }

      if (!(0, _isInteger2.default)(options.endTime)) {
        throw reject(new Error('Expecting integer for endTime'));
      }

      var endpoint = ENDPOINT_PREFIX + '/SearchPlayers';
      var query = '{\n            "PlayerNames": [\n              ' + players.map(function (player) {
        return '"' + player + '"';
      }).join(',') + '\n            ],\n            "GameType": "' + options.gameType + '",\n            "Actor": "' + options.actor + '",\n            "StartTime": ' + options.startTime + ',\n            "EndTime": ' + options.endTime + '\n          }';

      return http.execute('POST', endpoint, query).then(function (body) {
        return resolve(body);
      }).catch(function (err) {
        return new Error(err);
      });
    });
  }

  function searchUuid(uuid) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      startTime: 0,
      endTime: 0,
      transverse: true
    };

    return new Promise(function (resolve, reject) {
      if (!(0, _isInteger2.default)(options.startTime)) {
        throw reject(new Error('Expecting integer for startTime'));
      }

      if (!(0, _isInteger2.default)(options.endTime)) {
        throw reject(new Error('Expecting integer for endTime'));
      }

      if (!(0, _isBoolean2.default)(options.transverse)) {
        throw reject(new Error('Expecting boolean for transverse'));
      }

      var endpoint = ENDPOINT_PREFIX + '/search-uuid';
      var query = '{\n        "Criteria": {\n          "UUID": "' + uuid.trim() + '",\n          "StartTime": ' + options.startTime + ',\n          "EndTime": ' + options.endTime + '\n        }\n      }';

      // If transverse is provided, the client will resolve inner level urls
      var httpOptions = {
        transverse: options.transverse,
        transverseOn: 'Matches'
      };

      return http.execute('POST', endpoint, query, httpOptions).then(function (body) {
        return resolve(body);
      }).catch(function (err) {
        return new Error(err);
      });
    });
  }

  return {
    searchPlayers: searchPlayers,
    searchUuid: searchUuid
  };
};