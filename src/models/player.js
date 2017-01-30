import BaseModel from './';

export default class Player extends BaseModel {

  constructor(data) {
    super(data);
  }

  get name() {
    return this.data.attributes.name;
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

}
