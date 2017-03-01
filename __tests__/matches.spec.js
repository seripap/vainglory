jest.mock('../src/Http');
jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

import Vainglory from '../src/Vainglory';

const validMethods = ['single', 'collection'];

describe('Vainglory.matches', () => {
  const vainglory = new Vainglory('aaa.bbb.ccc.');

  it('should contain valid methods', () => {
    validMethods.forEach((method) => {
      expect(vainglory.matches[method]).toBeDefined();
    })
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
    const matches = await vainglory.matches.collection(options);
    expect(matches).toMatchSnapshot();
  });

  it('.single should get a single match', async () => {
    const matchId = 'f31b614a-fbbb-11e6-9ec9-062445d3d668';
    const match = await vainglory.matches.single(matchId);

    expect(match).toMatchSnapshot();
  });

  it('.single should throw if invalid param is given', async () => {
    try {
      await vainglory.matches.single({});
    } catch (err) {
      expect(err).toThrow();
    }
  });

});
