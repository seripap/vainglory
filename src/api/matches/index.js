// TODO: Filter Query Params

const ENDPOINT_PREFIX = 'matches';

export default (http) => {
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

      return http.execute('GET', endpoint, query).then(body => resolve(body)).catch(err => new Error(err));
    });
  }

  return {
    collection,
  };
};
