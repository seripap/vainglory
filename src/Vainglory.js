require('babel-polyfill');

import Api from './api';
import Http from './Http';

class Vainglory {
  constructor(apiKey = null) {
    if (!apiKey) {
      throw new Error('Missing API Key.');
    }

    const api = new Api(new Http(apiKey));
    // Exposed methods
    this.meta = api.meta;
    this.matches = api.matches;
  }

}

module.exports = Vainglory;
