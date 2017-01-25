import BaseModel from './';
import Participant from './participant';

export default class Roster extends BaseModel {
  constructor(data, included) {
    super(data, included);
  }

  get stats() {
    return this._data.stats;
  }
  
  get participants() {
    if ('participants' in this._data.relationships) {
      return this._data.relationships.participants.data.map((participant) => {
        return new Participant(this.filterInclude('participant').find((item) => item.id === participant.id), this._included);
      });
    }

    return null;
  }

}
