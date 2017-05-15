'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Players = function (_BaseModel) {
  (0, _inherits3.default)(Players, _BaseModel);

  function Players(data) {
    (0, _classCallCheck3.default)(this, Players);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Players.__proto__ || (0, _getPrototypeOf2.default)(Players)).call(this, data));

    _this.relationships = [{
      type: 'player'
    }];
    return _this;
  }

  (0, _createClass3.default)(Players, [{
    key: 'players',
    set: function set(player) {
      this.playersPlayer = player;
      return this;
    },
    get: function get() {
      return this.playersPlayer;
    }
  }]);
  return Players;
}(_2.default);

exports.default = Players;