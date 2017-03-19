'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Asset = function (_BaseModel) {
  _inherits(Asset, _BaseModel);

  function Asset(data) {
    _classCallCheck(this, Asset);

    return _possibleConstructorReturn(this, (Asset.__proto__ || Object.getPrototypeOf(Asset)).call(this, data));
  }

  _createClass(Asset, [{
    key: 'resolve',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var response, body;
        return regeneratorRuntime.wrap(function _callee$(_context) {
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