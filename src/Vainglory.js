require('babel-polyfill');

import Api from './api';
import Http from './Http';
import Utils from './Utils';

class Vainglory {
  constructor(apiKey = null) {
    if (!apiKey) {
      throw new Error('Missing API Key.');
    }

    const api = new Api(new Http(apiKey));
    api.bindTo(this);
  }

  get utils() {
    return Utils;
  }

}

module.exports = Vainglory;
