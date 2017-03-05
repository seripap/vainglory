import Api from './api';
import Http from './Http';
import Utils from './Utils';

class Vainglory {
  constructor(apiKey = null, options = {}) {
    if (!apiKey) {
      throw new Error('Missing API Key.');
    }

    const api = new Api(new Http(apiKey, options));
    api.bindTo(this);
    this.models = Utils.models;
  }

}

module.exports = Vainglory;
