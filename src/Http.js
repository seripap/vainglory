// TODO

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
      if (endpoint === null) {
        throw reject(new Error('HTTP Error: No endpoint to provide a request to.'));
      }

      this.options.method = method;
      this.options.url += endpoint;

      if (query) {
        this.options.url += `?${query}`;
      }

      request(this.options).then((body) => {
        const parsedBody = parseBody(body, options);
        if ('error' in parsedBody && parsedBody.error) {
          return reject(new Error(parsedBody));
        }
        return resolve(this.options.url);
        // return resolve(parsedBody);
      });
    });
  }

}
