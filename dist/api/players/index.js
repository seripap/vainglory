'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _player = require('../../models/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ENDPOINT_PREFIX = 'players';

exports.default = function (http, options, parser) {
  var single = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(playerId) {
      var endpoint, body;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (playerId) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', new Error('Expected required playerId. Usage: .single(playerId)'));

            case 2:
              if ((0, _isString2.default)(playerId)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return', new Error('Expected a string for playerId'));

            case 4:
              endpoint = ENDPOINT_PREFIX + '/' + playerId;
              _context.next = 7;
              return http.execute('GET', endpoint);

            case 7:
              body = _context.sent;
              return _context.abrupt('return', parser('player', body));

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function single(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    single: single
  };
};