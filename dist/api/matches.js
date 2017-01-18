'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// TODO: Filter Query Params

var ENDPOINT_PREFIX = 'matches';

exports.default = function (http) {
  function collection() {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return new Promise(function (resolve, reject) {

      var endpoint = '' + ENDPOINT_PREFIX;

      return http.execute('GET', endpoint).then(function (body) {
        return resolve(body);
      }).catch(function (err) {
        return new Error(err);
      });
    });
  }

  return {
    collection: collection
  };
};