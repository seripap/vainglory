'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Participant = function (_BaseModel) {
  _inherits(Participant, _BaseModel);

  function Participant(data, included) {
    _classCallCheck(this, Participant);

    return _possibleConstructorReturn(this, (Participant.__proto__ || Object.getPrototypeOf(Participant)).call(this, data, included));
  }

  _createClass(Participant, [{
    key: 'actor',
    get: function get() {
      return this._data.attributes.actor;
    }
  }, {
    key: 'stats',
    get: function get() {
      return this._data.attributes.stats;
    }
  }, {
    key: 'player',
    get: function get() {
      var _this2 = this;

      if ('player' in this._data.relationships) {
        return new _player2.default(this._included.find(function (item) {
          return item.id === _this2._data.relationships.player.data.id;
        }));
      }

      return null;
    }
  }]);

  return Participant;
}(_2.default);

exports.default = Participant;