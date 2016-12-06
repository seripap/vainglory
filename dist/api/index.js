'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

var _meta = require('./meta');

var _meta2 = _interopRequireDefault(_meta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Api = function Api(http) {
  _classCallCheck(this, Api);

  this.matches = (0, _matches2.default)(http);
  this.meta = (0, _meta2.default)(http);
};

exports.default = Api;