import matches from './matches';
import players from './players';
import parser from './parser';

export default class Api {
  constructor(http, options) {
    this.http = http;
    this.options = options;

    this.parser = parser;
  }

  bindTo(context) {
    context.matches = matches(this.http, this.options, this.parser);
    context.players = players(this.http, this.options, this.parser);
  }
}
