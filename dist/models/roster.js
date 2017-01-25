'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _participant = require('./participant');

var _participant2 = _interopRequireDefault(_participant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Roster = function (_BaseModel) {
  _inherits(Roster, _BaseModel);

  function Roster(data, included) {
    _classCallCheck(this, Roster);

    return _possibleConstructorReturn(this, (Roster.__proto__ || Object.getPrototypeOf(Roster)).call(this, data, included));
  }

  _createClass(Roster, [{
    key: 'stats',
    get: function get() {
      return this._data.stats;
    }
  }, {
    key: 'participants',
    get: function get() {
      var _this2 = this;

      if ('participants' in this._data.relationships) {
        return this._data.relationships.participants.data.map(function (participant) {
          return new _participant2.default(_this2._included.find(function (item) {
            return item.id === participant.id;
          }), _this2._included);
        });
      }

      return null;
    }
  }]);

  return Roster;
}(_2.default);

exports.default = Roster;