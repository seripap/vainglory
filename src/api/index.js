import matches from './matches';
import players from './players';

export default class Api {
  constructor(http) {
    this.matches = matches(http);
    this.players = players(http);
  }
}
