import BaseModel from './';
import Roster from './roster.js';

export default class MatchModel extends BaseModel {
  constructor(data, included) {
    super(data, included);
  }

  get createdAt() {
    return this._data.attributes.createdAt;
  }

  get duration() {
    return this._data.attributes.duration;
  }

  get gameMode() {
    return this._data.attributes.gameMode;
  }

  get patchVersion() {
    return this._data.attributes.patchVersion;
  }

  get shardId() {
    return this._data.attributes.shardId;
  }

  get stats() {
    return this._data.attributes.stats;
  }

  get titleId() {
    return this._data.attributes.titleId;
  }

  get rosters() {
    if ('rosters' in this._data.relationships) {
      return this._data.relationships.rosters.data.map((roster) => new Roster(this.filterInclude('roster').find((item) => item.id === roster.id), this._included));
    }

    return null;
  }
}
