// TODO

import request from 'request-promise';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

const defaults = {
  host: 'https://api.dc01.gamelockerapp.com/shards/na/',
  statusUrl: 'https://api.dc01.gamelockerapp.com/status',
  title: 'semc-vainglory',
  remap: true,
};

export default class Http {
  constructor(apiKey = null, options = defaults) {
    const requestOptions = Object.assign(options, defaults);
    this.options = {
      url: requestOptions.host,
      qs: {},
      headers: {
        'Content-Encoding': 'gzip',
        'Content-Type': 'application/json',
        'User-Agent': 'js/vainglory',
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${apiKey}`,
        'X-TITLE-ID': requestOptions.title,
      },
      json: true,
      simple: false,
    };
  }

  serialize(obj) {
    const queries = [];
    const loop = (obj, prefix = null) => {
      for (const property of Object.keys(obj)) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
          if (isObject(obj[property])) {
            loop(obj[property], property);
          } else {
            if (prefix) {
              queries.push(`${prefix}[${encodeURIComponent(property)}]=${encodeURIComponent(obj[property])}`);
            } else {
              queries.push(`${encodeURIComponent(property)}=${encodeURIComponent(obj[property])}`);
            }
          }
        }
      }
    };

    loop(obj);
    return queries.join('&');
  }

  parseBody(body, parseOptions = {}) {
    if (parseOptions.override) {
      return body;
    }

    if ('errors' in body) {
      return { error: true, message: body.errors };
    }

    return body;
  }

  async execute(method = 'GET', endpoint = null, query = null, options = {}) {
    const requestOptions = { ...this.options, options };

    if (endpoint === null) {
      return new Error('HTTP Error: No endpoint to provide a request to.');
    }

    requestOptions.method = method;
    requestOptions.url += endpoint;

    if (query) {
      requestOptions.url += `?${this.serialize(query)}`;
    }

    try {
      const body = await request(requestOptions);
      if (!body) {
        return { error: true, message: 'NO DATA' };
      }
      const parsedBody = this.parseBody(body, options);

      if (parsedBody.error) {
        throw new Error(parsedBody);
      }

      return parsedBody;
    } catch (e) {
      throw new Error(e);
    }
  }
}
