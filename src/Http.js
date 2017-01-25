// TODO

import request from 'request-promise';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

const defaults = {
  host: 'https://api.dc01.gamelockerapp.com/shards/na/',
  statusUrl: 'https://api.dc01.gamelockerapp.com/status',
  title: 'semc-vainglory',
};

export default class Http {
  constructor(apiKey = null, options = defaults) {
    this.options = {
      url: options.host,
      headers: {
        'Content-Encoding': 'gzip',
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
    return new Promise((resolve, reject) => {
      const requestOptions = Object.assign(options, this.options);
      const parseBody = (body, parseOptions = {}) => {
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
      };
      
      if (endpoint === null) {
        throw reject(new Error('HTTP Error: No endpoint to provide a request to.'));
      }

      requestOptions.method = method;
      requestOptions.url += endpoint;

      if (query) {
        requestOptions.url += `?${query}`;
      }

      request(requestOptions).then((body) => {
        const parsedBody = parseBody(body, options);
        if ('error' in parsedBody && parsedBody.error) {
          return reject(new Error(parsedBody));
        }

        return resolve(parsedBody);
      });
    });
  }

}
