"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// readonly
var BaseModel = function () {
  function BaseModel(data) {
    _classCallCheck(this, BaseModel);

    this.data = data;
    this.relationships = null;
  }

  _createClass(BaseModel, [{
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