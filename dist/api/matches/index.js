'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _match = require('../../models/match');

var _match2 = _interopRequireDefault(_match);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ENDPOINT_PREFIX = 'matches';

exports.default = function (http) {
  function single(matchId) {
    return new Promise(function (resolve, reject) {
      if (!matchId) {
        return reject(new Error('Expected required matchId. Usage: .single(matchId)'));
      }

      if (!(0, _isString2.default)(matchId)) {
        return reject(new Error('Expected a string for matchId'));
      }

      var endpoint = ENDPOINT_PREFIX + '/' + matchId;
      return http.execute('GET', endpoint).then(function (body) {
        return resolve(new _match2.default(body));
      }).catch(function (err) {
        return reject(new Error(err));
      });
    });
  }

  function collection() {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return new Promise(function (resolve, reject) {
      var defaults = {
        page: {
          offset: 0,
          limit: 50
        },
        sort: 'createdAt',
        filters: {
          started: '3hrs ago',
          ended: 'Now',
          playerNames: [],
          teamNames: []
        }
      };

      var query = http.serialize(Object.assign(options, defaults));
      var endpoint = '' + ENDPOINT_PREFIX;

      return http.execute('GET', endpoint, query).then(function (body) {
        return resolve(body);
      }).catch(function (err) {
        return reject(new Error(err));
      });
    });
  }

  return {
    single: single,
    collection: collection
  };
};