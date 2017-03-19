import BaseModel from './';

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

  get gameMode() {
    return this.data.attributes.gameMode;
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
