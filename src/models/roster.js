import BaseModel from './';

export default class Roster extends BaseModel {

  constructor(data) {
    super(data);
    this.relationships = [{
      type: 'participants',
    }];
  }

  get stats() {
    return this.data.attributes.stats;
  }

  set participants(participants) {
    this.rosterParticipants = participants;
    return this;
  }

  get participants() {
    return this.rosterParticipants;
  }

}
