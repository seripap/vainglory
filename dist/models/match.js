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

var _gameModes = require('./resources/gameModes');

var _gameModes2 = _interopRequireDefault(_gameModes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Match = function (_BaseModel) {
  (0, _inherits3.default)(Match, _BaseModel);

  function Match(data) {
    (0, _classCallCheck3.default)(this, Match);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Match.__proto__ || (0, _getPrototypeOf2.default)(Match)).call(this, data));

    _this.relationships = [{
      type: 'rosters'
    }, {
      type: 'assets'
    }];
    return _this;
  }

  (0, _createClass3.default)(Match, [{
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