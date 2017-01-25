import BaseModel from './';
import Player from './player';

export default class Participant extends BaseModel {
  constructor(data, included) {
    super(data, included);
  }

  get actor() {
    return this._data.attributes.actor;
  }  

  get stats() {
    return this._data.attributes.stats;
  }

  get player() {
    if ('player' in this._data.relationships) {
      return new Player(this.filterIncluded('player').find((item) => item.id === this._data.relationships.player.data.id));
    }

    return null;    
  }
}
