'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _Errors = require('./Errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
  host: 'https://api.dc01.gamelockerapp.com/shards/',
  suffix: '/shards/',
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
      status: requestOptions.statusUrl,
      headers: {
        'Content-Encoding': 'gzip',
        'Content-Type': 'application/json',
        'User-Agent': 'js/vainglory',
        Accept: 'application/vnd.api+json',
        Authorization: 'Bearer ' + apiKey,
        'X-TITLE-ID': requestOptions.title
      }
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
        if (body.errors.title) {
          return { error: true, messages: body.errors.title };
        }
        return { error: true, messages: body.errors };
      }

      return body;
    }
  }, {
    key: 'parseErrors',
    value: function parseErrors(status) {
      var err = { error: true };
      switch (status) {
        case 401:
          return _extends({}, err, { messages: _Errors.UNAUTHORIZED });
        case 404:
          return _extends({}, err, { messages: _Errors.NOT_FOUND });
        case 500:
          return _extends({}, err, { messages: _Errors.INTERNAL });
        case 429:
          return _extends({}, err, { messages: _Errors.RATE_LIMIT });
        case 503:
          return _extends({}, err, { messages: _Errors.OFFLINE });
        case 406:
          return _extends({}, err, { messages: _Errors.NOT_ACCEPTABLE });
        default:
          return _extends({}, err, { messages: _Errors.UNKNOWN });
      }
    }
  }, {
    key: 'status',
    value: function status() {
      return (0, _nodeFetch2.default)(this.options.status).then(function (res) {
        return res.json();
      }).catch(function (e) {
        return e;
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

      requestOptions.url += endpoint;

      if (query) {
        requestOptions.url += '?' + this.serialize(query);
      }

      return new Promise(function (resolve, reject) {
        (0, _nodeFetch2.default)(requestOptions.url, {
          method: requestOptions.method,
          headers: requestOptions.headers
        }).then(function (res) {
          if (res.status !== 200) {
            return reject(_this.parseErrors(res.status));
          }
          return res.json();
        }).then(function (body) {
          if (!body) {
            return reject(_Errors.NO_BODY);
          }

          var parsedBody = _this.parseBody(body, options);

          if (parsedBody && parsedBody.error) {
            reject(parsedBody.messages);
          }

          return resolve(parsedBody);
        }).catch(function (err) {
          return reject({
            error: true,
            message: _Errors.NETWORK_ERROR,
            details: err
          });
        });
      });
    }
  }]);

  return Http;
}();

exports.default = Http;