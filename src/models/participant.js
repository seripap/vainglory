import BaseModel from './';

export default class Participant extends BaseModel {

  constructor(data) {
    super(data);
    this.relationships = [{
      type: 'player',
    }];
  }

  get actor() {
    return this.raw.attributes.actor;
  }

  get stats() {
    return this.raw.attributes.stats;
  }

  set player(player) {
    this.participantPlayer = player;
    return this;
  }

  get player() {
    return this.participantPlayer;
  }

}
