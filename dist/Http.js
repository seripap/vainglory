'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _Errors = require('./Errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    (0, _classCallCheck3.default)(this, Http);

    var requestOptions = (0, _extends3.default)({}, defaults, options);
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

  (0, _createClass3.default)(Http, [{
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
          for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(obj)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
    value: function parseErrors(res, requestOptions, rateLimit) {
      var status = res.status;

      var err = { errors: true };
      var region = this.getRequestedRegion();
      switch (status) {
        case 401:
          return (0, _extends3.default)({}, err, { messages: _Errors.UNAUTHORIZED, region: region, debug: requestOptions, rateLimit: rateLimit }, res);
        case 404:
          return (0, _extends3.default)({}, err, { messages: _Errors.NOT_FOUND, region: region, debug: requestOptions, rateLimit: rateLimit }, res);
        case 500:
          return (0, _extends3.default)({}, err, { messages: _Errors.INTERNAL, region: region, debug: requestOptions, rateLimit: rateLimit }, res);
        case 429:
          return (0, _extends3.default)({}, err, { messages: _Errors.RATE_LIMIT, region: region, debug: requestOptions, rateLimit: rateLimit }, res);
        case 503:
          return (0, _extends3.default)({}, err, { messages: _Errors.OFFLINE, region: region, debug: requestOptions, rateLimit: rateLimit }, res);
        case 406:
          return (0, _extends3.default)({}, err, { messages: _Errors.NOT_ACCEPTABLE, region: region, debug: requestOptions, rateLimit: rateLimit }, res);
        default:
          return (0, _extends3.default)({}, err, { messages: _Errors.UNKNOWN, region: region, debug: requestOptions, rateLimit: rateLimit }, res);
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

      var requestOptions = (0, _extends3.default)({}, this.options);
      if (endpoint === null) {
        return new Error('HTTP Error: No endpoint to provide a request to.');
      }

      var region = this.getRequestedRegion();

      requestOptions.url += region + '/';
      requestOptions.url += endpoint;

      if (query) {
        requestOptions.url += '?' + this.serialize(query);
      }

      return new _promise2.default(function (resolve, reject) {
        var rateLimit = null;
        _this.tempRegion = null;

        (0, _nodeFetch2.default)(requestOptions.url, {
          method: requestOptions.method,
          headers: requestOptions.headers
        }).then(function (res) {
          rateLimit = _this.parseRateLimit(res.headers);
          if (res.status !== 200) {
            return _this.parseErrors(res, requestOptions, rateLimit);
          }
          return res.json();
        }).then(function (body) {
          // Empty responses
          if (!body) {
            return reject({ errors: true, messages: _Errors.NO_BODY, region: region, debug: requestOptions, rateLimit: rateLimit });
          }
          // Status code not 200
          if (body.errors) {
            return reject((0, _extends3.default)({}, body, { region: region, debug: requestOptions, rateLimit: rateLimit }));
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