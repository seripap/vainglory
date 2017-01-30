'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ENDPOINT_PREFIX = 'matches';

exports.default = function (http, options, parser) {
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
              _context.next = 7;
              return http.execute('GET', endpoint);

            case 7:
              body = _context.sent;
              return _context.abrupt('return', parser('match', body));

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

  var collection = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      var collectionOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var defaults, query, body;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              defaults = {
                page: {
                  offset: 0,
                  limit: 50
                },
                sort: 'createdAt',
                filter: {
                  'createdAt-start': '3hrs ago',
                  'createdAt-end': 'Now',
                  playerNames: [],
                  teamNames: []
                }
              };
              query = _extends({}, defaults, { collectionOptions: collectionOptions });
              _context2.next = 4;
              return http.execute('GET', '' + ENDPOINT_PREFIX, query);

            case 4:
              body = _context2.sent;
              return _context2.abrupt('return', parser('matches', body));

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function collection() {
      return _ref2.apply(this, arguments);
    };
  }();

  return {
    single: single,
    collection: collection
  };
};