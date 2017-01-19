// TODO

import request from 'request-promise';
import isArray from 'lodash/isArray';

const defaults = {
  host: 'https://api.dc01.gamelockerapp.com/shards/na/',
  title: 'semc-vainglory',
};

export default class Http {
  constructor(apiKey, options = defaults) {
    this.options = {
      url: HOST,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${apiKey}`,
        'X-TITLE-ID': title,
      },
    };
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

      // TODO: Filter query params
      // const queryParsed = query && JSON.parse(query);

      this.options.method = method;
      this.options.url += endpoint;

      // if (queryParsed) {
      //   this.options.body = queryParsed;
      //   this.options.json = true;
      // }

      request(this.options).then((body) => {
        const parsedBody = parseBody(body, options);
        if ('error' in parsedBody && parsedBody.error) {
          return reject(new Error(parsedBody));
        }

        return resolve(parsedBody);
      });
    });
  }

}
