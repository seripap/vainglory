import pkg from '../../package.json';
import matches from './matches';
import players from './players';
import tournament from './tournament';

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

  setRegion(context, region) {
    this.http.region = region;
    return context; 
  }

  region(context, region) {
    this.http.tempRegion = region;
    return context;
  }

  bindTo(context) {
    // Overwrites region
    context.setRegion = this.setRegion.bind(this, context);
    // Temporarily sets region for current call
    context.region = this.region.bind(this, context);
    context.status = this.status.bind(this);

    context.matches = matches(this.http);
    context.players = players(this.http);
    context.tournament = tournament(this.http);
  }

}
