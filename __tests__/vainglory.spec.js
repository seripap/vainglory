import Vainglory from '../src/Vainglory';
import Match from '../src/models/match';
import Asset from '../src/models/asset';
import Matches from '../src/models/matches';
import Participant from '../src/models/participant';
import Player from '../src/models/player';
import Roster from '../src/models/roster';
import parser from '../src/api/parser';

describe('Vainglory class setup', () => {
  it('should not initialize if an API key is not given', () => {
    function initalizeWithNoKey() {
      return new Vainglory();
    }

    expect(initalizeWithNoKey).toThrowError('Missing API Key');
  });

  it('should initialize with the correct context if an API key is given', () => {
    const apiKey = '1234567890';
    const vainglory = new Vainglory(apiKey);

    expect(vainglory).toBeDefined();
  });

  it('should have utils that exposes models', () => {
    const apiKey = '1234567890';
    const vainglory = new Vainglory('aaa.bbb.ccc');

    expect(new vainglory.models.Asset).toBeInstanceOf(Asset);
    expect(new vainglory.models.Match).toBeInstanceOf(Match);
    expect(new vainglory.models.Matches).toBeInstanceOf(Matches);
    expect(new vainglory.models.Participant).toBeInstanceOf(Participant);
    expect(new vainglory.models.Player).toBeInstanceOf(Player);
    expect(new vainglory.models.Roster).toBeInstanceOf(Roster);
  });

});
