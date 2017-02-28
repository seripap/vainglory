'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _Errors = require('./Errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
  host: 'https://api.dc01.gamelockerapp.com/shards/',
  region: 'na',
  statusUrl: 'https://api.dc01.gamelockerapp.com/status',
  title: 'semc-vainglory'
};

var Http = function () {
  function Http() {
    var apiKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaults;

    _classCallCheck(this, Http);

    var requestOptions = _extends({}, defaults, options);
    this.options = {
      url: '' + requestOptions.host + requestOptions.region.toLowerCase() + '/',
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

      if (body && 'errors' in body) {
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
          case 'Forbidden':
          case 'Unauthorized':
            return _Errors.UNAUTHORIZED;
          case 'Not Found':
            return _Errors.NOT_FOUND;
          case 'Internal Server Error':
            return _Errors.INTERNAL;
          case 'Too Many Requests':
            return _Errors.RATE_LIMIT;
          case 'Service Unavailable':
            return _Errors.OFFLINE;
          case 'Not Acceptable':
            return _Errors.NOT_ACCEPTABLE;
          case 'Method Not Allowed':
          case 'Bad Request':
          default:
            return _Errors.UNKNOWN;
        }
      });
    }
  }, {
    key: 'execute',
    value: function execute() {
      var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'GET';
      var endpoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var _this = this;

      var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var requestOptions = _extends({}, this.options, { options: options });

      if (endpoint === null) {
        return new Error('HTTP Error: No endpoint to provide a request to.');
      }

      requestOptions.method = method;
      requestOptions.url += endpoint;

      if (query) {
        requestOptions.url += '?' + this.serialize(query);
      }

      return new Promise(function (resolve, reject) {
        (0, _requestPromise2.default)(requestOptions).then(function (err, res, body) {
          console.log(err);
          console.log(res);
          console.log(body);
          if (!body) {
            reject(_Errors.NO_BODY);
          }

          var parsedBody = _this.parseBody(body, options);

          if (parsedBody && parsedBody.error) {
            reject(new Error(parsedBody.messages));
          }

          resolve(parsedBody);
        }).catch(function (err) {
          console.log(err);
        });
      });
    }
  }]);

  return Http;
}();

exports.default = Http;