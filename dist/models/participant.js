'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _actors = require('./resources/actors');

var _actors2 = _interopRequireDefault(_actors);

var _items = require('./resources/items');

var _items2 = _interopRequireDefault(_items);

var _skillTiers = require('./resources/skillTiers');

var _skillTiers2 = _interopRequireDefault(_skillTiers);

var _karma = require('./resources/karma');

var _karma2 = _interopRequireDefault(_karma);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Participant = function (_BaseModel) {
  (0, _inherits3.default)(Participant, _BaseModel);

  function Participant(data) {
    (0, _classCallCheck3.default)(this, Participant);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Participant.__proto__ || (0, _getPrototypeOf2.default)(Participant)).call(this, data));

    _this.relationships = [{
      type: 'player'
    }];
    return _this;
  }

  (0, _createClass3.default)(Participant, [{
    key: 'replaceItem',
    value: function replaceItem(key, stats) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var property = _step.value;

          var normalizedName = _items2.default.find(function (item) {
            return item.serverName === property;
          });
          if (normalizedName) {
            stats[key][normalizedName.name] = stats[key][property];
            delete stats[key][property];
          }
        };

        for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(stats[key])), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return stats[key];
    }
  }, {
    key: 'replaceItemArray',
    value: function replaceItemArray(key, stats) {
      stats[key].forEach(function (element, index) {
        var normalizedName = _items2.default.find(function (item) {
          return item.serverName === element;
        });
        if (normalizedName) {
          stats[key][index] = normalizedName.name;
        }
      });

      return stats.items;
    }
  }, {
    key: '_actor',
    get: function get() {
      return this.raw.attributes.actor;
    }
  }, {
    key: 'actor',
    get: function get() {
      var _this2 = this;

      var normalizedActor = _actors2.default.find(function (actor) {
        return actor.serverName === _this2.raw.attributes.actor;
      });
      return normalizedActor ? normalizedActor.name : this.raw.attributes.actor;
    }
  }, {
    key: '_stats',
    get: function get() {
      return this.raw.attributes.stats;
    }
  }, {
    key: 'stats',
    get: function get() {
      var stats = this.raw.attributes.stats;
      stats.itemGrants = this.replaceItem('itemGrants', stats);
      stats.itemUses = this.replaceItem('itemUses', stats);
      stats.items = this.replaceItemArray('items', stats);
      stats.skillTier = _skillTiers2.default.find(function (tier) {
        return tier.serverName === stats.skillTier;
      }).name || stats.skillTier;
      stats.karmaLevel = _karma2.default.find(function (k) {
        return k.serverName === stats.karmaLevel;
      }).name || stats.karmaLevel;
      return stats;
    }
  }, {
    key: 'player',
    set: function set(player) {
      this.participantPlayer = player;
      return this;
    },
    get: function get() {
      return this.participantPlayer;
    }
  }]);
  return Participant;
}(_2.default);

exports.default = Participant;