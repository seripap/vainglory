import isString from 'lodash/isString';
import parser from '../parser';
import { normalizeError } from '../../Errors';

const ENDPOINT_PREFIX = 'players';

export default (http) => {
  async function getByName(playerName) {
    if (!playerName) {
      return normalizeError('Expected required playerName. Usage: .getByName(playerName)');
    }

    if (!isString(playerName)) {
      return normalizeError('Expected a string for playerName');
    }

    const defaults = { filter: { playerName: '' } };
    const query = { ...defaults, filter: { playerName } };

    try { 
      const response = await http.execute('GET', `${ENDPOINT_PREFIX}`, query);

      if (response.errors) {
        return normalizeError(response.messages);
      }

      return parser('player', response.body);
    } catch (e) {
      return normalizeError(null, e);
    }
  }

  async function getById(playerId) {
    if (!playerId) {
      return normalizeError('Expected required playerId. Usage: .single(playerId)');
    }

    if (!isString(playerId)) {
      return normalizeError('Expected a string for playerId');
    }

    const endpoint = `${ENDPOINT_PREFIX}/${playerId}`;

    try {
      const response = await http.execute('GET', endpoint);
      
      if (response.errors) {
        return normalizeError(response.messages);
      }

      return parser('player', response.body);
    } catch (e) {
      return normalizeError(null, e);
    }

  }

  return { getByName, getById };
};
