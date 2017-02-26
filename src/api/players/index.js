import isString from 'lodash/isString';

const ENDPOINT_PREFIX = 'players';

export default (http, options, parser) => {
  async function getByName(playerName) {
    console.log('Heads up! This endpoint currently does not work, it is here because it is listed in the API docs.');
    if (!playerName) {
      return new Error('Expected required playerName. Usage: .getByName(playerName)');
    }

    if (!isString(playerName)) {
      return new Error('Expected a string for playerName');
    }

    const endpoint = `${ENDPOINT_PREFIX}`;
    const defaults = { filter: { playerNames: '' } };
    const query = { ...defaults, filter: { playerNames: playerName } };
    const body = await http.execute('GET', `${ENDPOINT_PREFIX}`, query);

    return parser('player', body);
  }

  async function getById(playerId) {
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

  return { getByName, getById };
}
