import isString from 'lodash/isString';

const ENDPOINT_PREFIX = 'players';

export default (http, options, parser) => {
  async function single(playerId) {
    if (!playerId) {
      return new Error('Expected required playerId. Usage: .single(playerId)');
    }

    if (!isString(playerId)) {
      return new Error('Expected a string for playerId');
    }

    const endpoint = `${ENDPOINT_PREFIX}/${playerId}`;

    const body = await http.execute('GET', endpoint);
    return parser('player', body);
  }

  return {
    single,
  };
};
