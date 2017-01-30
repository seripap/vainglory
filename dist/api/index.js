'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

var _players = require('./players');

var _players2 = _interopRequireDefault(_players);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Api = function () {
  function Api(http, options) {
    _classCallCheck(this, Api);

    this.http = http;
    this.options = options;

    this.parser = _parser2.default;
  }

  _createClass(Api, [{
    key: 'bindTo',
    value: function bindTo(context) {
      context.matches = (0, _matches2.default)(this.http, this.options, this.parser);
      context.players = (0, _players2.default)(this.http, this.options, this.parser);
    }
  }]);

  return Api;
}();

exports.default = Api;