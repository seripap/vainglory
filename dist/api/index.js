'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

var _players = require('./players');

var _players2 = _interopRequireDefault(_players);

var _tournament = require('./tournament');

var _tournament2 = _interopRequireDefault(_tournament);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Api = function () {
  function Api(http) {
    (0, _classCallCheck3.default)(this, Api);

    this.http = http;
  }

  (0, _createClass3.default)(Api, [{
    key: 'status',
    value: function status() {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        _this.http.status().then(function (res) {
          return res.json();
        }).then(function (body) {
          if (body && body.data) {
            return resolve({
              id: body.data.id,
              releasedAt: body.data.attributes.releasedAt,
              version: body.data.attributes.version,
              clientVersion: _package2.default.version });
          }
          return resolve(body);
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }, {
    key: 'setRegion',
    value: function setRegion(context, region) {
      this.http.region = region;
      return context;
    }
  }, {
    key: 'region',
    value: function region(context, _region) {
      this.http.tempRegion = _region;
      return context;
    }
  }, {
    key: 'bindTo',
    value: function bindTo(context) {
      // Overwrites region
      context.setRegion = this.setRegion.bind(this, context);
      // Temporarily sets region for current call
      context.region = this.region.bind(this, context);
      context.status = this.status.bind(this);

      context.matches = (0, _matches2.default)(this.http);
      context.players = (0, _players2.default)(this.http);
      context.tournament = (0, _tournament2.default)(this.http);
    }
  }]);
  return Api;
}();

exports.default = Api;