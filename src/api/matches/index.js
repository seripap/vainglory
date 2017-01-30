import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

const ENDPOINT_PREFIX = 'matches';

export default (http, options, parser) => {
  async function single(matchId) {
    if (!matchId) {
      return new Error('Expected required matchId. Usage: .single(matchId)');
    }

    if (!isString(matchId)) {
      return new Error('Expected a string for matchId');
    }

    const endpoint = `${ENDPOINT_PREFIX}/${matchId}`;
    const body = await http.execute('GET', endpoint);   

    return parser('match', body);
  }

  async function collection(collectionOptions = {}) {
    const defaults = {
      page: {
        offset: 0,
        limit: 50,
      },
      sort: 'createdAt',
      filter: {
        'createdAt-start': '3hrs ago',
        'createdAt-end': 'Now',
        playerNames: [],
        teamNames: [],
      },
    };

    const query = { ...defaults, collectionOptions };
    const body = await http.execute('GET', `${ENDPOINT_PREFIX}`, query);

    return parser('matches', body);
  }

  return {
    single,
    collection,
  };
};
