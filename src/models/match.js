import BaseModel from './';
import gameModeType from './resources/gameModes';

export default class Match extends BaseModel {

  constructor(data) {
    super(data);
    this.relationships = [{
      type: 'rosters',
    }, {
      type: 'assets',
    }];
  }

  get createdAt() {
    return this.data.attributes.createdAt;
  }

  get duration() {
    return this.data.attributes.duration;
  }

  get _gameMode() {
    return this.data.attributes.gameMode;
  }

  get gameMode() {
    const normalizedGameMode = gameModeType.find(mode => mode.serverName === this._gameMode);
    return normalizedGameMode ? normalizedGameMode.name : this._gameMode;
  }

  get patchVersion() {
    return this.data.attributes.patchVersion;
  }

  get shardId() {
    return this.data.attributes.shardId;
  }

  get stats() {
    return this.data.attributes.stats;
  }

  get titleId() {
    return this.data.attributes.titleId;
  }

  set rosters(rosters) {
    this.matchRoster = rosters;
    return this;
  }

  get rosters() {
    return this.matchRoster;
  }
}
