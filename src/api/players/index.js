import isString from 'lodash/isString';
import parser from '../parser';

const ENDPOINT_PREFIX = 'players';

export default (http) => {
  async function getByName(playerName) {
    if (!playerName) {
      return new Error('Expected required playerName. Usage: .getByName(playerName)');
    }

    if (!isString(playerName)) {
      return new Error('Expected a string for playerName');
    }

    const defaults = { filter: { playerName: '' } };
    const query = { ...defaults, filter: { playerName } };

    try { 
      const body = await http.execute('GET', `${ENDPOINT_PREFIX}`, query);

      return parser('player', body);
    } catch (e) {
      return e;
    }
  }

  async function getById(playerId) {
    if (!playerId) {
      return new Error('Expected required playerId. Usage: .single(playerId)');
    }

    if (!isString(playerId)) {
      return new Error('Expected a string for playerId');
    }

    const endpoint = `${ENDPOINT_PREFIX}/${playerId}`;

    try {
      const body = await http.execute('GET', endpoint);
      return parser('player', body);
    } catch (e) {
      return e;
    }

  }

  return { getByName, getById };
};
