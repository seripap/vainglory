jest.mock('../src/Http');

import Vainglory from '../src/Vainglory';

const validMethods = ['getByName', 'getById'];

describe('Vainglory.single', () => {
  const vainglory = new Vainglory('aaa.bbb.ccc');

  it('should contain valid methods', () => {
    validMethods.forEach((method) => {
      expect(vainglory.players[method]).toBeDefined();
    })
  });

  it('.getByName should get players by name', async () => {
    const playerNames = ['famous'];
    const player = await vainglory.players.getByName(playerNames);

    expect(player).toMatchSnapshot();
  });

  it('.getById should get a single player by Id', async () => {
    const playerId = 'd4844ad0-7017-11e4-8e49-062d0b175276';
    const player = await vainglory.players.getById(playerId);

    expect(player).toMatchSnapshot();
  });

  it('.getByName should throw if invalid param is given', async () => {
    try {
      await vainglory.players.getByName({});
    } catch (err) {
      expect(err).toThrow();
    }
  });

  it('.getById should throw if invalid param is given', async () => {
    try {
      await vainglory.players.getById({});
    } catch (err) {
      expect(err).toThrow();
    }
  });

});
