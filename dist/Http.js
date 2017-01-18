'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // TODO

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HOST = 'https://api.madglory.com';

var Http = function () {
  function Http(apiKey) {
    var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'v1';

    _classCallCheck(this, Http);

    this.options = {
      url: HOST + '/' + version + '/',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-api-key': apiKey
      }
    };
  }

  _createClass(Http, [{
    key: 'execute',
    value: function execute() {
      var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'GET';
      var endpoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var _this = this;

      var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      function transverse(response, on) {
        return new Promise(function (resolve) {
          if (on in response) {
            if ((0, _isArray2.default)(response[on])) {
              var responseRequests = response[on].map(function (uri) {
                return (0, _requestPromise2.default)(uri);
              });
              resolve(Promise.all(responseRequests));
            }
          }
        });
      }

      function parseBody(body, parseOptions) {
        if (parseOptions.override) {
          return body;
        }

        try {
          if ('message' in body) {
            return {
              error: true,
              message: body.message
            };
          }

          if ('error' in body && body.error) {
            var message = 'Unknown Error';

            if ('meta' in body) {
              message = body.meta;
            }

            return {
              error: true,
              message: message
            };
          }

          return body;
        } catch (e) {
          return {
            error: true,
            message: e
          };
        }
      }

      return new Promise(function (resolve, reject) {
        if (endpoint === null) {
          throw reject(new Error('HTTP Error: No endpoint to provide a request to.'));
        }

        var queryParsed = query && JSON.parse(query);

        _this.options.method = method;
        _this.options.url += endpoint;

        if (queryParsed) {
          _this.options.body = queryParsed;
          _this.options.json = true;
        }

        (0, _requestPromise2.default)(_this.options).then(function (body) {
          console.log(body);
          var parsedBody = parseBody(body, options);
          if (parsedBody.error) {
            return reject(new Error(parsedBody));
          }

          if (options.transverse) {
            return transverse(parsedBody.response, options.transverseOn).then(function (transversedData) {
              return resolve(transversedData);
            }).catch(function (err) {
              // Error
              throw err;
            });
          }

          return resolve(parsedBody);
        });
      });
    }
  }]);

  return Http;
}();

exports.default = Http;