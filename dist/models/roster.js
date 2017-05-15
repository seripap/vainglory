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

var Roster = function (_BaseModel) {
  (0, _inherits3.default)(Roster, _BaseModel);

  function Roster(data) {
    (0, _classCallCheck3.default)(this, Roster);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Roster.__proto__ || (0, _getPrototypeOf2.default)(Roster)).call(this, data));

    _this.relationships = [{
      type: 'participants'
    }];
    return _this;
  }

  (0, _createClass3.default)(Roster, [{
    key: 'stats',
    get: function get() {
      return this.data.attributes.stats;
    }
  }, {
    key: 'participants',
    set: function set(participants) {
      this.rosterParticipants = participants;
      return this;
    },
    get: function get() {
      return this.rosterParticipants;
    }
  }]);
  return Roster;
}(_2.default);

exports.default = Roster;