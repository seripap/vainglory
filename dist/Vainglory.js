'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _Http = require('./Http');

var _Http2 = _interopRequireDefault(_Http);

var _Utils = require('./Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('babel-polyfill');

var Vainglory = function () {
  function Vainglory() {
    var apiKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Vainglory);

    if (!apiKey) {
      throw new Error('Missing API Key.');
    }

    var api = new _api2.default(new _Http2.default(apiKey));
    api.bindTo(this);
  }

  _createClass(Vainglory, [{
    key: 'utils',
    get: function get() {
      return _Utils2.default;
    }
  }]);

  return Vainglory;
}();

module.exports = Vainglory;