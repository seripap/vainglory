import isString from 'lodash/isString';
import parser from '../parser';
import { normalizeError } from '../../Errors';
import { encodePlayerNames } from '../../Utils';

const ENDPOINT_PREFIX = 'matches';

export default (http) => {
  async function single(matchId) {
    if (!matchId) {
      return normalizeError('Expected required matchId. Usage: .single(matchId)')
    }

    if (!isString(matchId)) {
      return normalizeError('Expected a string for matchId');
    }

    const endpoint = `${ENDPOINT_PREFIX}/${matchId}`;
    try {
      const response = await http.execute('GET', endpoint);
      const { errors, messages } = response;

      if (errors) {
        return normalizeError(messages);
      }

      const model = parser('match', response.body);
      model.extend('rateLimit', response.rateLimit);

      return model;
    } catch (e) {
      return normalizeError(null, e);
    }

  }

  async function collection(collectionOptions = {}) {
    const now = new Date();
    const minus3Hours = new Date(new Date() * 1 - 1000 * 3600 * 3);

    const defaults = {
      page: { offset: 0, limit: 50 },
      sort: 'createdAt',
      filter: { 'createdAt-start': minus3Hours.toISOString(), 'createdAt-end': now.toISOString(), playerNames: [], teamNames: [] },
    };

    const query = { ...defaults, ...collectionOptions };

    if (query.filter.playerNames && query.filter.playerNames.length > 0) {
      query.filter.playerNames = encodePlayerNames(query.filter.playerNames);
    }

    try {
      const response = await http.execute('GET', `${ENDPOINT_PREFIX}`, query);
      const { errors, messages } = response;

      if (errors) {
        return normalizeError(messages);
      }
      const model = parser('matches', response.body);
      model.extend('rateLimit', response.rateLimit);

      return model;
    } catch (e) {
      return normalizeError(null, e);
    }
  }

  return { single, collection };
};
