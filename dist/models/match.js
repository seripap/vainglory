'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _roster = require('./roster.js');

var _roster2 = _interopRequireDefault(_roster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MatchModel = function (_BaseModel) {
  _inherits(MatchModel, _BaseModel);

  function MatchModel(data, included) {
    _classCallCheck(this, MatchModel);

    return _possibleConstructorReturn(this, (MatchModel.__proto__ || Object.getPrototypeOf(MatchModel)).call(this, data, included));
  }

  _createClass(MatchModel, [{
    key: 'createdAt',
    get: function get() {
      return this._data.attributes.createdAt;
    }
  }, {
    key: 'duration',
    get: function get() {
      return this._data.attributes.duration;
    }
  }, {
    key: 'gameMode',
    get: function get() {
      return this._data.attributes.gameMode;
    }
  }, {
    key: 'patchVersion',
    get: function get() {
      return this._data.attributes.patchVersion;
    }
  }, {
    key: 'shardId',
    get: function get() {
      return this._data.attributes.shardId;
    }
  }, {
    key: 'stats',
    get: function get() {
      return this._data.attributes.stats;
    }
  }, {
    key: 'titleId',
    get: function get() {
      return this._data.attributes.titleId;
    }
  }, {
    key: 'rosters',
    get: function get() {
      var _this2 = this;

      if ('rosters' in this._data.relationships) {
        return this._data.relationships.rosters.data.map(function (roster) {
          var normalizedRoster = _this2._included.find(function (item) {
            return item.id === roster.id;
          });
          return new _roster2.default(normalizedRoster, _this2._included);
        });
      }

      return null;
    }
  }]);

  return MatchModel;
}(_2.default);

exports.default = MatchModel;