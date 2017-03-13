import BaseModel from './';

export default class Players extends BaseModel {

  constructor(data) {
    super(data);
    this.relationships = [{
      type: 'player',
    }];
  }

  set players(player) {
    this.playersPlayer = player;
    return this;
  }

  get players() {
    return this.playersPlayer;
  }
}
