'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseModel = function () {
  function BaseModel(json) {
    var included = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, BaseModel);

    // Data can be set arbitrarily or from an HTTP response 
    if ('data' in json) {
      this._data = json.data;
    } else {
      this._data = json;
    }

    if ('included' in json) {
      this._included = json.included;
    } else if (included) {
      this._included = included;
    }
  }

  _createClass(BaseModel, [{
    key: 'type',
    get: function get() {
      return this._data.type;
    }
  }, {
    key: 'id',
    get: function get() {
      return this._data.id;
    }
  }, {
    key: 'raw',
    get: function get() {
      return this._data;
    }
  }]);

  return BaseModel;
}();

exports.default = BaseModel;