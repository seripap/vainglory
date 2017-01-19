'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// TODO: Filter Query Params

var ENDPOINT_PREFIX = 'matches';

exports.default = function (http) {
  function collection() {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return new Promise(function (resolve, reject) {
      var defaults = {
        page: {
          offset: 0,
          limit: 50
        },
        sort: 'createdAt',
        filters: {
          started: '3hrs ago',
          ended: 'Now',
          playerNames: [],
          teamNames: []
        }
      };

      var query = http.serialize(Object.assign(options, defaults));
      console.log(query);
      var endpoint = '' + ENDPOINT_PREFIX;

      return http.execute('GET', endpoint, query).then(function (body) {
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