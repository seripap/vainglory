jest.mock('../src/Http');

import Vainglory from '../src/Vainglory';

const validMethods = ['matches', 'players'];

describe('Vainglory.tournament', () => {
  const vainglory = new Vainglory('aaa.bbb.ccc');
  it('should contain valid methods', () => {
    validMethods.forEach((method) => {
      expect(vainglory.tournament.region()[method]).toBeDefined();
    })
  });

  it('.getByName should get players by name', async () => {
    const playerNames = ['famous'];
    const player = await vainglory.tournament.region().players.getByName(playerNames);

    expect(player).toMatchSnapshot();
  });

  it('.getById should get a single player by Id', async () => {
    const playerId = 'd4844ad0-7017-11e4-8e49-062d0b175276';
    const player = await vainglory.tournament.region().players.getById(playerId);

    expect(player).toMatchSnapshot();
  });

  it('.getByName should throw if invalid param is given', async () => {
    try {
      await vainglory.tournament.region().players.getByName({});
    } catch (err) {
      expect(err).toThrow();
    }
  });

  it('.getById should throw if invalid param is given', async () => {
    try {
      await vainglory.tournament.region().players.getById({});
    } catch (err) {
      expect(err).toThrow();
    }
  });

  it('.collection should get a collection of matches', async () => {
    const options = {
      page: {
        offset: 0,
        limit: 5,
      },
      filter: { 
        'createdAt-start': 'fake-time', 
        'createdAt-end': 'fake-time', 
      }
    };
    const matches = await vainglory.tournament.region().matches.collection(options);
    expect(matches).toMatchSnapshot();
  });

  it('.single should get a single match', async () => {
    const matchId = 'f31b614a-fbbb-11e6-9ec9-062445d3d668';
    const match = await vainglory.tournament.region().matches.single(matchId);

    expect(match).toMatchSnapshot();
  });

  it('.single should throw if invalid param is given', async () => {
    try {
      await vainglory.tournament.region().matches.single({});
    } catch (err) {
      expect(err).toThrow();
    }
  });

});
