
// Mock data
import singleMock from './single.json';
import matchesMock from './matches.json';

import request from 'request-promise';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

const defaults = {
  host: 'https://api.dc01.gamelockerapp.com/shards/na/',
  title: 'semc-vainglory',
};

export default class Http {
  constructor(apiKey, options = defaults) {
    this.options = {
      url: options.host,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${apiKey}`,
        'X-TITLE-ID': options.title,
      },
    };
  }

  serialize(obj) {
    const queries = [];
    const loop = (obj) => {    
      for (const property of Object.keys(obj)) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
          if (isObject(obj[property])) {
            loop(obj[property]);
          } else {
            queries.push(`${encodeURIComponent(property)}=${encodeURIComponent(obj[property])}`);
          }
        }
      }
    };
   
    loop(obj);
    return queries.join('&');
  }

  execute(method = 'GET', endpoint = null, query = null, options = {}) {
    function parseBody(body, parseOptions = {}) {
      if (parseOptions.override) {
        return body;
      }

      try {
        const parsed = JSON.parse(body);
        if ('errors' in parsed) {
          return {
            error: true,
            message: parsed.errors,
          };
        }

        return parsed;
      } catch (e) {
        return {
          error: true,
          message: e,
        };
      }
    }

    return new Promise((resolve, reject) => {
      const requestOptions = Object.assign(options, this.options);
      if (endpoint === null) {
        throw reject(new Error('HTTP Error: No endpoint to provide a request to.'));
      }

      requestOptions.method = method;
      requestOptions.url += endpoint;

      if (query) {
        requestOptions.url += `?${query}`;
      }

      if (requestOptions.url === 'https://api.dc01.gamelockerapp.com/shards/na/matches?offset=0&limit=50&sort=createdAt&started=3hrs%20ago&ended=Now') {
        return resolve(matchesMock);
      }

      if (requestOptions.url === 'https://api.dc01.gamelockerapp.com/shards/na/matches/0123b560-d74c-11e6-b845-0671096b3e30') {
        return resolve(singleMock);
      }

      if (method && endpoint) {
        return resolve(true);
      }

      if (query) {
        return resolve(true);
      }

      return reject(false);
    });
  }

}
