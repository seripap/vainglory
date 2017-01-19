'use strict';

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _Http = require('./Http');

var _Http2 = _interopRequireDefault(_Http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('babel-polyfill');

var Vainglory = function Vainglory() {
  var apiKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  _classCallCheck(this, Vainglory);

  if (!apiKey) {
    throw new Error('Missing API Key.');
  }

  var api = new _api2.default(new _Http2.default(apiKey));
  // Exposed methods
  this.meta = api.meta;
  this.matches = api.matches;
};

module.exports = Vainglory;