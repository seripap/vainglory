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

var ENDPOINT_PREFIX = 'matches';

exports.default = function (http) {
  var single = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(matchId) {
      var endpoint, body;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (matchId) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', new Error('Expected required matchId. Usage: .single(matchId)'));

            case 2:
              if ((0, _isString2.default)(matchId)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return', new Error('Expected a string for matchId'));

            case 4:
              endpoint = ENDPOINT_PREFIX + '/' + matchId;
              _context.prev = 5;
              _context.next = 8;
              return http.execute('GET', endpoint);

            case 8:
              body = _context.sent;
              return _context.abrupt('return', (0, _parser2.default)('match', body));

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](5);
              return _context.abrupt('return', _context.t0);

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[5, 12]]);
    }));

    return function single(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var collection = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      var collectionOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var now, minus3Hours, defaults, query, body;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              now = new Date();
              minus3Hours = new Date(new Date() * 1 - 1000 * 3600 * 3);
              defaults = {
                page: { offset: 0, limit: 50 },
                sort: 'createdAt',
                filter: { 'createdAt-start': minus3Hours.toISOString(), 'createdAt-end': now.toISOString(), playerNames: [], teamNames: [] }
              };
              query = _extends({}, defaults, collectionOptions);
              _context2.prev = 4;
              _context2.next = 7;
              return http.execute('GET', '' + ENDPOINT_PREFIX, query);

            case 7:
              body = _context2.sent;
              return _context2.abrupt('return', (0, _parser2.default)('matches', body));

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2['catch'](4);
              return _context2.abrupt('return', _context2.t0);

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[4, 11]]);
    }));

    return function collection() {
      return _ref2.apply(this, arguments);
    };
  }();

  return { single: single, collection: collection };
};