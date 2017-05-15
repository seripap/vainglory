'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _parser = require('../parser');

var _parser2 = _interopRequireDefault(_parser);

var _Errors = require('../../Errors');

var _Utils = require('../../Utils');

var _matches = require('../matches');

var _matches2 = _interopRequireDefault(_matches);

var _players = require('../players');

var _players2 = _interopRequireDefault(_players);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REGION_PREFIX = 'tournament';

exports.default = function (http) {

  function region() {
    var REQUESTED_REGION = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var REGION_TO_REQUEST = null;
    if (!REQUESTED_REGION) {
      REGION_TO_REQUEST = http.region;
    } else {
      REGION_TO_REQUEST = REQUESTED_REGION;
    }

    http.tempRegion = REGION_PREFIX + '-' + REGION_TO_REQUEST;
    return {
      matches: (0, _matches2.default)(http),
      players: (0, _players2.default)(http)
    };
  }

  return {
    region: region
  };
};