import BaseModel from './';

export default class Player extends BaseModel {
  constructor(data) {
    super(data);
  }

  get name() {
    return this._data.attributes.name;
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

}
