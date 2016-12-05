import matches from './matches';
import meta from './meta';

export default class Api {
  constructor(http) {
    this.matches = matches(http);
    this.meta = meta(http);
  }
}
