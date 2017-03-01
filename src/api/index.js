import pkg from '../../package.json';
import matches from './matches';
import players from './players';

export default class Api {
  constructor(http) {
    this.http = http;
  }

  status() {
    return new Promise((resolve, reject) => {
      this.http
        .status()
        .then(res => res.json())
        .then(body => {
          if (body && body.data) {
            return resolve({ 
              id: body.data.id, 
              releasedAt: body.data.attributes.releasedAt, 
              version: body.data.attributes.version,
              clientVersion: pkg.version });
          }
          return resolve(body);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  bindTo(context) {
    context.matches = matches(this.http);
    context.players = players(this.http);
    context.status = this.status.bind(this);
  }

}
