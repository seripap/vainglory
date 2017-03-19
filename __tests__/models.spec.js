import BaseModel from '../src/models';
import Asset from '../src/models/asset';
import Match from '../src/models/match';
import Matches from '../src/models/matches';
import Participant from '../src/models/participant';
import Player from '../src/models/player';
import Roster from '../src/models/roster';
import parser from '../src/api/parser';

import matchCollection from '../src/__mocks__/matchCollection.json';
import matchSingle from '../src/__mocks__/matchSingle.json';
import playerById from '../src/__mocks__/playerById.json';

describe('Vainglory data models', () => {

  describe('baseModel', () => { 
    var baseModel = null;
    beforeEach(() => {
      baseModel = new BaseModel(playerById.data);
    });

    it('should initalize base model', () => {
      expect(baseModel).toMatchSnapshot();
    });

    it('should return raw response', () => {
      expect(baseModel.raw).toBe(playerById.data);
    });

    it('should return the correct id', () => {
      expect(baseModel.id).toBe('d4844ad0-7017-11e4-8e49-062d0b175276');
    });

    it('should return the correct type', () => {
      expect(baseModel.type).toBe('player');
    });
  });

  describe('Match', () => {
    var matchModel = null;
    beforeAll(() => {
      matchModel = parser('match', matchSingle);
    });

    it('should initalize', () => {
      expect(matchModel).toMatchSnapshot();
    });

    it('should have createdAt', () => {
      expect(matchModel.createdAt).toBeDefined();
    });

    it('should have duration', () => {
      expect(matchModel.duration).toBeDefined();
    });

    it('should have gameMode', () => {
      expect(matchModel.gameMode).toBeDefined();
    });

    it('should have patchVersion', () => {
      expect(matchModel.patchVersion).toBeDefined();
    });

    it('should have shardId', () => {
      expect(matchModel.shardId).toBeDefined();
    });

    it('should have stats', () => {
      expect(matchModel.stats).toBeDefined();
    });

    it('should have titleId', () => {
      expect(matchModel.titleId).toBeDefined();
    });

    it('roster have an array of Roster', () => {
      const randomSample = Math.floor(Math.random() * matchModel.rosters.length)
      expect(matchModel.rosters[randomSample]).toBeInstanceOf(Roster);
    });
  });

  describe('Matches', () => {
    var matchesModel = null;
    beforeAll(() => {
      matchesModel = parser('matches', matchCollection);
    });

    it('should initalize', () => {
      expect(matchesModel).toMatchSnapshot();
    });

    it('should have an array of Match', () => {
      const randomSample = Math.floor(Math.random() * matchesModel.match.length);
      expect(matchesModel.match[randomSample]).toBeInstanceOf(Match);
    });
  });

});
