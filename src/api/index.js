import matches from './matches';

export default class Api {
  constructor(http) {
    this.matches = matches(http);
  }
}
