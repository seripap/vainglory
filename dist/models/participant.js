'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _actors = require('./resources/actors');

var _actors2 = _interopRequireDefault(_actors);

var _items = require('./resources/items');

var _items2 = _interopRequireDefault(_items);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Participant = function (_BaseModel) {
  _inherits(Participant, _BaseModel);

  function Participant(data) {
    _classCallCheck(this, Participant);

    var _this = _possibleConstructorReturn(this, (Participant.__proto__ || Object.getPrototypeOf(Participant)).call(this, data));

    _this.relationships = [{
      type: 'player'
    }];
    return _this;
  }

  _createClass(Participant, [{
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

        for (var _iterator = Object.keys(stats[key])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
      stats.items = this.replaceItem('items', stats);
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