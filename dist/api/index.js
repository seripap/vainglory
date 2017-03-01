'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

var _players = require('./players');

var _players2 = _interopRequireDefault(_players);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Api = function () {
  function Api(http) {
    _classCallCheck(this, Api);

    this.http = http;
  }

  _createClass(Api, [{
    key: 'status',
    value: function status() {
      var _this = this;

      return new Promise(function (resolve, reject) {
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
      context.matches = (0, _matches2.default)(this.http);
      context.players = (0, _players2.default)(this.http);
      // Overwrites region
      context.setRegion = this.setRegion.bind(this, context);
      // Temporarily sets region for current call
      context.region = this.region.bind(this, context);
      context.status = this.status.bind(this);
    }
  }]);

  return Api;
}();

exports.default = Api;