'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Asset = function (_BaseModel) {
  (0, _inherits3.default)(Asset, _BaseModel);

  function Asset(data) {
    (0, _classCallCheck3.default)(this, Asset);
    return (0, _possibleConstructorReturn3.default)(this, (Asset.__proto__ || (0, _getPrototypeOf2.default)(Asset)).call(this, data));
  }

  (0, _createClass3.default)(Asset, [{
    key: 'resolve',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var response, body;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return (0, _nodeFetch2.default)(this.URL);

              case 3:
                response = _context.sent;
                _context.next = 6;
                return response.json();

              case 6:
                body = _context.sent;
                return _context.abrupt('return', body);

              case 10:
                _context.prev = 10;
                _context.t0 = _context['catch'](0);

                console.log(_context.t0);
                return _context.abrupt('return', false);

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 10]]);
      }));

      function resolve() {
        return _ref.apply(this, arguments);
      }

      return resolve;
    }()
  }, {
    key: 'URL',
    get: function get() {
      return this.data.attributes.URL;
    }
  }, {
    key: 'contentType',
    get: function get() {
      return this.data.attributes.contentType;
    }
  }, {
    key: 'createdAt',
    get: function get() {
      return this.data.attributes.createdAt;
    }
  }, {
    key: 'description',
    get: function get() {
      return this.data.attributes.description;
    }
  }, {
    key: 'filename',
    get: function get() {
      return this.data.attributes.filename;
    }
  }, {
    key: 'name',
    get: function get() {
      return this.data.attributes.name;
    }
  }]);
  return Asset;
}(_2.default);

exports.default = Asset;