'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _parser = require('../parser');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ENDPOINT_PREFIX = 'players';

exports.default = function (http) {
  var getByName = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(playerName) {
      var defaults, query, body;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (playerName) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', new Error('Expected required playerName. Usage: .getByName(playerName)'));

            case 2:
              if ((0, _isString2.default)(playerName)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return', new Error('Expected a string for playerName'));

            case 4:
              defaults = { filter: { playerName: '' } };
              query = _extends({}, defaults, { filter: { playerName: playerName } });
              _context.prev = 6;
              _context.next = 9;
              return http.execute('GET', '' + ENDPOINT_PREFIX, query);

            case 9:
              body = _context.sent;
              return _context.abrupt('return', (0, _parser2.default)('player', body));

            case 13:
              _context.prev = 13;
              _context.t0 = _context['catch'](6);
              return _context.abrupt('return', _context.t0);

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[6, 13]]);
    }));

    return function getByName(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var getById = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(playerId) {
      var endpoint, body;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (playerId) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return', new Error('Expected required playerId. Usage: .single(playerId)'));

            case 2:
              if ((0, _isString2.default)(playerId)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt('return', new Error('Expected a string for playerId'));

            case 4:
              endpoint = ENDPOINT_PREFIX + '/' + playerId;
              _context2.prev = 5;
              _context2.next = 8;
              return http.execute('GET', endpoint);

            case 8:
              body = _context2.sent;
              return _context2.abrupt('return', (0, _parser2.default)('player', body));

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2['catch'](5);
              return _context2.abrupt('return', _context2.t0);

            case 15:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[5, 12]]);
    }));

    return function getById(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  return { getByName: getByName, getById: getById };
};