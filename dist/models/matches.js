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

var Matches = function (_BaseModel) {
  (0, _inherits3.default)(Matches, _BaseModel);

  function Matches(data) {
    (0, _classCallCheck3.default)(this, Matches);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Matches.__proto__ || (0, _getPrototypeOf2.default)(Matches)).call(this, data));

    _this.relationships = [{
      type: 'match'
    }];
    return _this;
  }

  (0, _createClass3.default)(Matches, [{
    key: 'matches',
    set: function set(match) {
      this.matchesMatch = match;
      return this;
    },
    get: function get() {
      return this.matchesMatch;
    }
  }]);
  return Matches;
}(_2.default);

exports.default = Matches;