'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // TODO

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
  host: 'https://api.dc01.gamelockerapp.com/shards/na/',
  statusUrl: 'https://api.dc01.gamelockerapp.com/status',
  title: 'semc-vainglory'
};

var Http = function () {
  function Http() {
    var apiKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaults;

    _classCallCheck(this, Http);

    this.options = {
      url: options.host,
      headers: {
        'Content-Encoding': 'gzip',
        'Content-Type': 'application/json',
        Accept: 'application/vnd.api+json',
        Authorization: 'Bearer ' + apiKey,
        'X-TITLE-ID': options.title
      }
    };
  }

  _createClass(Http, [{
    key: 'serialize',
    value: function serialize(obj) {
      var queries = [];
      var loop = function loop(obj) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.keys(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var property = _step.value;

            if (Object.prototype.hasOwnProperty.call(obj, property)) {
              if ((0, _isObject2.default)(obj[property])) {
                loop(obj[property]);
              } else {
                queries.push(encodeURIComponent(property) + '=' + encodeURIComponent(obj[property]));
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
    key: 'execute',
    value: function execute() {
      var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'GET';
      var endpoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var _this = this;

      var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      return new Promise(function (resolve, reject) {
        var requestOptions = Object.assign(options, _this.options);
        var parseBody = function parseBody(body) {
          var parseOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          if (parseOptions.override) {
            return body;
          }

          try {
            var parsed = JSON.parse(body);
            if ('errors' in parsed) {
              return {
                error: true,
                message: parsed.errors
              };
            }

            return parsed;
          } catch (e) {
            return {
              error: true,
              message: e
            };
          }
        };

        if (endpoint === null) {
          throw reject(new Error('HTTP Error: No endpoint to provide a request to.'));
        }

        requestOptions.method = method;
        requestOptions.url += endpoint;

        if (query) {
          requestOptions.url += '?' + query;
        }

        (0, _requestPromise2.default)(requestOptions).then(function (body) {
          var parsedBody = parseBody(body, options);
          if ('error' in parsedBody && parsedBody.error) {
            return reject(new Error(parsedBody));
          }

          return resolve(parsedBody);
        });
      });
    }
  }]);

  return Http;
}();

exports.default = Http;