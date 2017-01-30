import matches from './matches';
import players from './players';

export default class Api {
  constructor(http) {
    this._http = http;
  }

  bindTo(context) {
    context.matches = matches(this._http);
    context.players = players(this._http);
  }
}
