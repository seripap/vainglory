'use strict';

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _Http = require('./Http');

var _Http2 = _interopRequireDefault(_Http);

var _Utils = require('./Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vainglory = function Vainglory() {
  var apiKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _classCallCheck(this, Vainglory);

  if (!apiKey) {
    throw new Error('Missing API Key.');
  }

  var api = new _api2.default(new _Http2.default(apiKey, options));
  api.bindTo(this);
  this.models = _Utils2.default.models;
};

module.exports = Vainglory;