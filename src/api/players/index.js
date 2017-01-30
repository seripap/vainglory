import isString from 'lodash/isString';
import PlayerModel from '../../models/player';

const ENDPOINT_PREFIX = 'players';

export default (http) => {
  function single(playerId) {
    return new Promise((resolve, reject) => {
      if (!playerId) {
        return reject(new Error('Expected required playerId. Usage: .single(playerId)'));
      }

      if (!isString(playerId)) {
        return reject(new Error('Expected a string for playerId'));
      }

      const endpoint = `${ENDPOINT_PREFIX}/${playerId}`;

      return http.execute('GET', endpoint).then(body => resolve(new PlayerModel(body))).catch(err => reject(new Error(err)));
    });
  }

  return {
    single,
  };
};
