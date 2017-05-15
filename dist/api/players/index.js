'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _parser = require('../parser');

var _parser2 = _interopRequireDefault(_parser);

var _Errors = require('../../Errors');

var _Utils = require('../../Utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ENDPOINT_PREFIX = 'players';

exports.default = function (http) {
  var getByName = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(playerNames) {
      var defaults, query, response, errors, messages, model;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (playerNames) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', (0, _Errors.normalizeError)('Expected required playerNames. Usage: .getByName([playerNames])'));

            case 2:
              if ((0, _isArray2.default)(playerNames)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return', (0, _Errors.normalizeError)('Expected an array for playerNames'));

            case 4:
              defaults = { filter: { playerName: [] } };
              query = (0, _extends3.default)({}, defaults, { filter: { playerNames: playerNames } });


              if (query.filter.playerNames) {
                query.filter.playerNames = (0, _Utils.encodePlayerNames)(query.filter.playerNames);
              }

              _context.prev = 7;
              _context.next = 10;
              return http.execute('GET', '' + ENDPOINT_PREFIX, query);

            case 10:
              response = _context.sent;
              errors = response.errors, messages = response.messages;

              if (!errors) {
                _context.next = 14;
                break;
              }

              return _context.abrupt('return', (0, _Errors.normalizeError)(messages));

            case 14:
              model = (0, _parser2.default)('players', response.body);

              model.extend('rateLimit', response.rateLimit);

              return _context.abrupt('return', model);

            case 19:
              _context.prev = 19;
              _context.t0 = _context['catch'](7);
              return _context.abrupt('return', (0, _Errors.normalizeError)(null, _context.t0));

            case 22:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[7, 19]]);
    }));

    return function getByName(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var getById = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(playerId) {
      var endpoint, response, errors, messages, model;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (playerId) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return', (0, _Errors.normalizeError)('Expected required playerId. Usage: .single(playerId)'));

            case 2:
              if ((0, _isString2.default)(playerId)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt('return', (0, _Errors.normalizeError)('Expected a string for playerId'));

            case 4:
              endpoint = ENDPOINT_PREFIX + '/' + playerId;
              _context2.prev = 5;
              _context2.next = 8;
              return http.execute('GET', endpoint);

            case 8:
              response = _context2.sent;
              errors = response.errors, messages = response.messages;

              if (!errors) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt('return', (0, _Errors.normalizeError)(messages));

            case 12:
              model = (0, _parser2.default)('player', response.body);

              model.extend('rateLimit', response.rateLimit);

              return _context2.abrupt('return', model);

            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2['catch'](5);
              return _context2.abrupt('return', (0, _Errors.normalizeError)(null, _context2.t0));

            case 20:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[5, 17]]);
    }));

    return function getById(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  return { getByName: getByName, getById: getById };
};