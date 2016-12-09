import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isInteger from 'lodash/isInteger';
import isBoolean from 'lodash/isBoolean';

const ENDPOINT_PREFIX = 'Matches';

export default (http) => {
  // Find a match by which players played
  function searchPlayers(players, options = {
    gameType: 'string',
    actor: 'string',
    startTime: 0,
    endTime: 0,
  }) {
    return new Promise((resolve, reject) => {
      if (!isArray(players)) {
        throw reject(new Error('Expecting array for players'));
      }

      if (!isString(options.gameType)) {
        throw reject(new Error('Expecting string for gameType'));
      }

      if (!isString(options.actor)) {
        throw reject(new Error('Expecting string for actor'));
      }

      if (!isInteger(options.startTime)) {
        throw reject(new Error('Expecting integer for startTime'));
      }

      if (!isInteger(options.endTime)) {
        throw reject(new Error('Expecting integer for endTime'));
      }

      const endpoint = `${ENDPOINT_PREFIX}/SearchPlayers`;
      const query = `{
            "PlayerNames": [
              ${players.map(player => `"${player}"`).join(',')}
            ],
            "GameType": "${options.gameType}",
            "Actor": "${options.actor}",
            "StartTime": ${options.startTime},
            "EndTime": ${options.endTime}
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

      const endpoint = `${ENDPOINT_PREFIX}/SearchUUID`;
      const query = `{
          "UUID": "${uuid.trim()}",
          "StartTime": ${options.startTime},
          "EndTime": ${options.endTime}
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
