import Api from './api';
import Http from './Http';

class Vainglory {
  constructor(apiKey = null, options = {}) {
    if (!apiKey) {
      throw new Error('Missing API Key.');
    }

    const api = new Api(new Http(apiKey, options));
    api.bindTo(this);
  }

}

module.exports = Vainglory;
