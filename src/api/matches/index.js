import isString from 'lodash/isString';
import parser from '../parser';
import { normalizeError } from '../../Errors';

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

      if (response.errors) {
        return normalizeError(response.messages);
      }

      return {errors: response.errors, ...parser('match', response.body)};
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

    try {
      const response = await http.execute('GET', `${ENDPOINT_PREFIX}`, query);
      
      if (response.errors) {
        return normalizeError(response.messages);
      }

      return parser('matches', response.body);
      return { errors: response.errors, ...parser('match', response.body)};
    } catch (e) {
      return normalizeError(null, e);
    }
  }

  return { single, collection };
};
