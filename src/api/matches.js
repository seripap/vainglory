// TODO: Filter Query Params

const ENDPOINT_PREFIX = 'matches';

export default (http) => {
  function collection(query = {}) {
    return new Promise((resolve, reject) => {

      const endpoint = `${ENDPOINT_PREFIX}`;

      return http.execute('GET', endpoint).then(body => resolve(body)).catch(err => new Error(err));
    });
  }

  return {
    collection,
  };
};
