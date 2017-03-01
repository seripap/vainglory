'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.normalizeError = normalizeError;
var RATE_LIMIT = exports.RATE_LIMIT = 'Request rate limited. Free for non-commercial use for up to 10 requests per minute! To increase your rate limit, please contact api@superevilmegacorp.com';
var UNAUTHORIZED = exports.UNAUTHORIZED = 'Unauthorized Access. invalid API key provided.';
var UNKNOWN = exports.UNKNOWN = 'Unknown error, please check your request and try again.';
var INTERNAL = exports.INTERNAL = 'Internal Server Error.';
var NO_BODY = exports.NO_BODY = 'No body returned from response.';
var NOT_FOUND = exports.NOT_FOUND = 'The specified object could not be found.';
var OFFLINE = exports.OFFLINE = 'API is currently offline, try again later.';
var NOT_ACCEPTABLE = exports.NOT_ACCEPTABLE = 'You requested a format that is\'t JSON';
var NETWORK_ERROR = exports.NETWORK_ERROR = 'Network error, check host name.';

function normalizeError() {
  var messages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Unknown Client error';
  var attachments = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return _extends({
    errors: true,
    messages: messages
  }, attachments);
}