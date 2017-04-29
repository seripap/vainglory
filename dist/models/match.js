'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _gameModes = require('./resources/gameModes');

var _gameModes2 = _interopRequireDefault(_gameModes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Match = function (_BaseModel) {
  _inherits(Match, _BaseModel);

  function Match(data) {
    _classCallCheck(this, Match);

    var _this = _possibleConstructorReturn(this, (Match.__proto__ || Object.getPrototypeOf(Match)).call(this, data));

    _this.relationships = [{
      type: 'rosters'
    }, {
      type: 'assets'
    }];
    return _this;
  }

  _createClass(Match, [{
    key: 'createdAt',
    get: function get() {
      return this.data.attributes.createdAt;
    }
  }, {
    key: 'duration',
    get: function get() {
      return this.data.attributes.duration;
    }
  }, {
    key: '_gameMode',
    get: function get() {
      return this.data.attributes.gameMode;
    }
  }, {
    key: 'gameMode',
    get: function get() {
      var _this2 = this;

      var normalizedGameMode = _gameModes2.default.find(function (mode) {
        return mode.serverName === _this2._gameMode;
      });
      return normalizedGameMode ? normalizedGameMode.name : this._gameMode;
    }
  }, {
    key: 'patchVersion',
    get: function get() {
      return this.data.attributes.patchVersion;
    }
  }, {
    key: 'shardId',
    get: function get() {
      return this.data.attributes.shardId;
    }
  }, {
    key: 'stats',
    get: function get() {
      return this.data.attributes.stats;
    }
  }, {
    key: 'titleId',
    get: function get() {
      return this.data.attributes.titleId;
    }
  }, {
    key: 'rosters',
    set: function set(rosters) {
      this.matchRoster = rosters;
      return this;
    },
    get: function get() {
      return this.matchRoster;
    }
  }]);

  return Match;
}(_2.default);

exports.default = Match;