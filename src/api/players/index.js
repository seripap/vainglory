import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import parser from '../parser';
import { normalizeError } from '../../Errors';
import { encodePlayerNames } from '../../Utils';

const ENDPOINT_PREFIX = 'players';


export default (http) => {
  async function getByName(playerNames) {
    if (!playerNames) {
      return normalizeError('Expected required playerNames. Usage: .getByName([playerNames])');
    }

    if (!isArray(playerNames)) {
      return normalizeError('Expected an array for playerNames');
    }

    const defaults = { filter: { playerName: [] } };
    const query = { ...defaults, filter: { playerNames } };

    if (query.filter.playerNames) {
      query.filter.playerNames = encodePlayerNames(query.filter.playerNames);
    }

    try { 
      const response = await http.execute('GET', `${ENDPOINT_PREFIX}`, query);
      const { errors, messages } = response;

      if (errors) {
        return normalizeError(messages);
      }

      const model = parser('players', response.body);
      model.extend('rateLimit', response.rateLimit);

      return model;
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
      const { errors, messages } = response;

      if (errors) {
        return normalizeError(messages);
      }

      const model = parser('player', response.body);
      model.extend('rateLimit', response.rateLimit);

      return model;
    } catch (e) {
      return normalizeError(null, e);
    }

  }

  return { getByName, getById };
};
