import isArray from 'lodash/isArray';
import isInteger from 'lodash/isInteger';
import isBoolean from 'lodash/isBoolean';

const ENDPOINT_PREFIX = 'matches';

export default (http) => {
  function searchPlayers(players, options = {
    startTime: 0,
    endTime: 0,
  }) {
    return new Promise((resolve, reject) => {
      if (!isArray(players)) {
        throw reject(new Error('Expecting array for players'));
      }

      if (!isInteger(options.startTime)) {
        throw reject(new Error('Expecting integer for startTime'));
      }

      if (!isInteger(options.endTime)) {
        throw reject(new Error('Expecting integer for endTime'));
      }

      const endpoint = `${ENDPOINT_PREFIX}/search-players`;
      const query = `{
        "Criteria": {
          "PlayerNames": [${players.join(',')}],
          "StartTime": ${options.startTime},
          "EndTime": ${options.endTime}
        }
      }`;

      return http.execute('POST', endpoint, query).then(body => resolve(body)).catch(err => new Error(err));
    });
  }

  function searchUuid(uuid, options = {
    startTime: 0,
    endTime: 0,
    transverse: true,
  }) {
    return new Promise((resolve, reject) => {
      if (!isInteger(options.startTime)) {
        throw reject(new Error('Expecting integer for startTime'));
      }

      if (!isInteger(options.endTime)) {
        throw reject(new Error('Expecting integer for endTime'));
      }

      if (!isBoolean(options.transverse)) {
        throw reject(new Error('Expecting boolean for transverse'));
      }

      const endpoint = `${ENDPOINT_PREFIX}/search-uuid`;
      const query = `{
        "Criteria": {
          "UUID": "${uuid.trim()}",
          "StartTime": ${options.startTime},
          "EndTime": ${options.endTime}
        }
      }`;

      // If transverse is provided, the client will resolve inner level urls
      const httpOptions = {
        transverse: options.transverse,
        transverseOn: 'Matches',
      };

      return http.execute('POST', endpoint, query, httpOptions).then(body => resolve(body)).catch(err => new Error(err));
    });
  }

  return {
    searchPlayers,
    searchUuid,
  };
};
