"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// readonly
var BaseModel = function () {
  function BaseModel(data) {
    (0, _classCallCheck3.default)(this, BaseModel);

    this.data = data;
    this.relationships = null;
  }

  (0, _createClass3.default)(BaseModel, [{
    key: "extend",
    value: function extend(key, properties) {
      this[key] = properties;
      return this;
    }
  }, {
    key: "id",
    set: function set(id) {
      this.data.id = id;
      return this;
    },
    get: function get() {
      return this.data.id;
    }
  }, {
    key: "type",
    get: function get() {
      return this.data.type;
    }
  }, {
    key: "raw",
    get: function get() {
      return this.data;
    }
  }]);
  return BaseModel;
}();

exports.default = BaseModel;