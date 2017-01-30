import BaseModel from './';

export default class Matches extends BaseModel {

  constructor(data) {
    super(data);
    this.relationships = [{
      type: 'match',
    }];
  }

  set matches(match) {
    this.matchesMatch = match;
    return this;
  }

  get matches() {
    return this.matchesMatch;
  }
}
