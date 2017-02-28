import pkg from '../../package.json';
import matches from './matches';
import players from './players';

export default class Api {
  constructor(http) {
    this.http = http;
  }

  bindTo(context) {
    context.matches = matches(this.http);
    context.players = players(this.http);
    context.status = this.status();
  }

  status() {
    return new Promise((resolve, reject) => {
      this.http
        .status()
        .then(res => {
          if (res && res.data) {
            return resolve({ 
              id: res.data.id, 
              releasedAt: res.data.attributes.releasedAt, 
              version: res.data.attributes.version,
              clientVersion: pkg.version });
          }
          return resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
