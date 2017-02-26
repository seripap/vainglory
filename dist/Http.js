'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // TODO

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
  host: 'https://api.dc01.gamelockerapp.com/shards/na/',
  statusUrl: 'https://api.dc01.gamelockerapp.com/status',
  title: 'semc-vainglory',
  remap: true
};

var ERRORS = {
  rated: 'You have hit the rate limit.  Free for non-commercial use for up to 10 requests per minute! To increase your rate limit, please contact api@superevilmegacorp.com',
  auth: 'Unauthorized, invalid API key provided.',
  unknown: 'Unknown error, please try your request again.',
  empty: 'Data not found'
};

var Http = function () {
  function Http() {
    var apiKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaults;

    _classCallCheck(this, Http);

    var requestOptions = Object.assign(options, defaults);
    this.options = {
      url: requestOptions.host,
      qs: {},
      headers: {
        'Content-Encoding': 'gzip',
        'Content-Type': 'application/json',
        'User-Agent': 'js/vainglory',
        Accept: 'application/vnd.api+json',
        Authorization: 'Bearer ' + apiKey,
        'X-TITLE-ID': requestOptions.title
      },
      json: true,
      simple: false
    };
  }

  _createClass(Http, [{
    key: 'serialize',
    value: function serialize(obj) {
      var queries = [];
      var loop = function loop(obj) {
        var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.keys(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var property = _step.value;

            if (Object.prototype.hasOwnProperty.call(obj, property)) {
              if ((0, _isPlainObject2.default)(obj[property])) {
                loop(obj[property], property);
              } else if ((0, _isArray2.default)(obj[property])) {
                if (prefix) {
                  queries.push(prefix + '[' + encodeURIComponent(property) + ']=' + obj[property].join(','));
                } else {
                  queries.push(encodeURIComponent(property) + '=' + obj[property].join(','));
                }
              } else {
                if (prefix) {
                  queries.push(prefix + '[' + encodeURIComponent(property) + ']=' + obj[property]);
                } else {
                  queries.push(encodeURIComponent(property) + '=' + obj[property]);
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      };

      loop(obj);
      return queries.join('&');
    }
  }, {
    key: 'parseBody',
    value: function parseBody(body) {
      var parseOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (parseOptions.override) {
        return body;
      }

      if ('errors' in body) {
        var messages = this.parseErrors(body.errors);
        return { error: true, messages: messages };
      }

      return body;
    }
  }, {
    key: 'parseErrors',
    value: function parseErrors(errors) {
      return errors.map(function (err) {
        switch (err.title) {
          case 'Unauthorized':
            return ERRORS.auth;
          case 'Not Found':
            return ERRORS.empty;
          default:
            return ERRORS.unknown;
        }
      });
    }
  }, {
    key: 'execute',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'GET';
        var endpoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var requestOptions, body, parsedBody;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                requestOptions = _extends({}, this.options, { options: options });

                if (!(endpoint === null)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt('return', new Error('HTTP Error: No endpoint to provide a request to.'));

              case 3:

                requestOptions.method = method;
                requestOptions.url += endpoint;

                if (query) {
                  requestOptions.url += '?' + this.serialize(query);
                }

                _context.prev = 6;
                _context.next = 9;
                return (0, _requestPromise2.default)(requestOptions);

              case 9:
                body = _context.sent;

                if (body) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt('return', { error: true, messages: ['NO DATA'] });

              case 12:
                parsedBody = this.parseBody(body, options);

                if (!parsedBody.error) {
                  _context.next = 15;
                  break;
                }

                return _context.abrupt('return', new Error(parsedBody.messages));

              case 15:
                return _context.abrupt('return', parsedBody);

              case 18:
                _context.prev = 18;
                _context.t0 = _context['catch'](6);
                return _context.abrupt('return', new Error(_context.t0));

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 18]]);
      }));

      function execute() {
        return _ref.apply(this, arguments);
      }

      return execute;
    }()
  }]);

  return Http;
}();

exports.default = Http;