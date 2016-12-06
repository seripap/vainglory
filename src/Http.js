// TODO

import request from 'request-promise';
import isArray from 'lodash/isArray';

const HOST = 'https://api.madglory.com';

export default class Http {
  constructor(apiKey, version = 'v1') {
    this.options = {
      url: `${HOST}/${version}/`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-api-key': apiKey,
      },
    };
  }

  execute(method = 'GET', endpoint = null, query = null, options = {}) {
    function transverse(response, on) {
      return new Promise((resolve) => {
        if (on in response) {
          if (isArray(response[on])) {
            const responseRequests = response[on].map(uri => request(uri));
            resolve(Promise.all(responseRequests));
          }
        }
      });
    }

    function parseBody(body, parseOptions) {
      if (parseOptions.override) {
        return body;
      }

      try {
        if ('message' in body) {
          return {
            error: true,
            message: body.message,
          };
        }

        if ('error' in body && body.error) {
          let message = 'Unknown Error';

          if ('meta' in body) {
            message = body.meta;
          }

          return {
            error: true,
            message,
          };
        }

        return body;
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

      const queryParsed = query && JSON.parse(query);

      console.log('parsed query', queryParsed);

      this.options.method = method;
      this.options.url += endpoint;

      if (queryParsed) {
        this.options.body = queryParsed;
        this.options.json = true;
      }

      console.log(this.options);

      request(this.options).then((body) => {
        const parsedBody = parseBody(body, options);
        if (parsedBody.error) {
          return reject(new Error(parsedBody));
        }

        if (options.transverse) {
          return transverse(parsedBody.response, options.transverseOn).then(transversedData => resolve(transversedData)).catch((err) => {
            // Error
            throw err;
          });
        }

        return resolve(parsedBody);
      });
    });
  }

}
