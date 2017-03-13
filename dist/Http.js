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
    this._tempRegion = null;
    this._region = requestOptions.region.toLowerCase(), this.options = {
      url: '' + requestOptions.host,
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
    key: 'getRequestedRegion',
    value: function getRequestedRegion() {
      return this.tempRegion ? this.tempRegion : this.region;
    }
  }, {
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
    key: 'parseErrors',
    value: function parseErrors(status, requestOptions, rateLimit) {
      var err = { errors: true };
      var region = this.getRequestedRegion();
      switch (status) {
        case 401:
          return _extends({}, err, { messages: _Errors.UNAUTHORIZED, region: region, debug: requestOptions, rateLimit: rateLimit });
        case 404:
          return _extends({}, err, { messages: _Errors.NOT_FOUND, region: region, debug: requestOptions, rateLimit: rateLimit });
        case 500:
          return _extends({}, err, { messages: _Errors.INTERNAL, region: region, debug: requestOptions, rateLimit: rateLimit });
        case 429:
          return _extends({}, err, { messages: _Errors.RATE_LIMIT, region: region, debug: requestOptions, rateLimit: rateLimit });
        case 503:
          return _extends({}, err, { messages: _Errors.OFFLINE, region: region, debug: requestOptions, rateLimit: rateLimit });
        case 406:
          return _extends({}, err, { messages: _Errors.NOT_ACCEPTABLE, region: region, debug: requestOptions, rateLimit: rateLimit });
        default:
          return _extends({}, err, { messages: _Errors.UNKNOWN, region: region, debug: requestOptions, rateLimit: rateLimit });
      }
    }
  }, {
    key: 'status',
    value: function status() {
      return (0, _nodeFetch2.default)(this.options.status);
    }
  }, {
    key: 'parseRateLimit',
    value: function parseRateLimit(headers) {
      return {
        limit: headers.get('x-ratelimit-limit'),
        remaining: headers.get('x-ratelimit-remaining'),
        reset: headers.get('x-ratelimit-reset'),
        requestId: headers.get('x-request-id')
      };
    }
  }, {
    key: 'execute',
    value: function execute() {
      var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'GET';

      var _this = this;

      var endpoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var requestOptions = _extends({}, this.options);
      if (endpoint === null) {
        return new Error('HTTP Error: No endpoint to provide a request to.');
      }

      var region = this.getRequestedRegion();

      requestOptions.url += region + '/';
      requestOptions.url += endpoint;

      if (query) {
        requestOptions.url += '?' + this.serialize(query);
      }

      return new Promise(function (resolve, reject) {
        var rateLimit = null;
        _this.tempRegion = null;

        (0, _nodeFetch2.default)(requestOptions.url, {
          method: requestOptions.method,
          headers: requestOptions.headers
        }).then(function (res) {
          rateLimit = _this.parseRateLimit(res.headers);
          if (res.status !== 200) {
            return _this.parseErrors(res.status, requestOptions, rateLimit);
          }
          return res.json();
        }).then(function (body) {
          // Empty responses
          if (!body) {
            return reject({ errors: true, messages: _Errors.NO_BODY, region: region, debug: requestOptions, rateLimit: rateLimit });
          }
          // Status code not 200
          if (body.errors) {
            return reject(_extends({}, body, { region: region, debug: requestOptions, rateLimit: rateLimit }));
          }

          return resolve({
            errors: null,
            body: body,
            region: region,
            debug: requestOptions,
            rateLimit: rateLimit
          });
        }).catch(function (err) {
          return reject({
            errors: true,
            messages: _Errors.NETWORK_ERROR,
            region: region,
            details: err,
            debug: requestOptions,
            rateLimit: rateLimit
          });
        });
      });
    }
  }, {
    key: 'tempRegion',
    set: function set(newTempRegion) {
      this._tempRegion = newTempRegion;
      return this;
    },
    get: function get() {
      return this._tempRegion;
    }
  }, {
    key: 'region',
    set: function set(newRegion) {
      this._region = newRegion;
      return this;
    },
    get: function get() {
      return this._region;
    }
  }]);

  return Http;
}();

exports.default = Http;