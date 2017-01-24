import isString from 'lodash/isString';

const ENDPOINT_PREFIX = 'matches';

export default (http) => {
  function single(matchId) {
    return new Promise((resolve, reject) => {
      if (!matchId) {
        return reject(new Error('Expected required matchId. Usage: .single(matchId)'));
      }

      if (!isString(matchId)) {
        return reject(new Error('Expected a string for matchId'));
      }

      const endpoint = `${ENDPOINT_PREFIX}/${matchId}`;
      return http.execute('GET', endpoint).then(body => resolve(body)).catch(err => reject(new Error(err)));
    });
  }

  function collection(query = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const defaults = {
        page: {
          offset: 0,
          limit: 50,
        },
        sort: 'createdAt',
        filters: {
          started: '3hrs ago',
          ended: 'Now',
          playerNames: [],
          teamNames: [],
        },
      };

      const query = http.serialize(Object.assign(options, defaults));
      const endpoint = `${ENDPOINT_PREFIX}`;

      return http.execute('GET', endpoint, query).then(body => resolve(body)).catch(err => reject(new Error(err)));
    });
  }

  return {
    single,
    collection,
  };
};
