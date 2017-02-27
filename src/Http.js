// TODO

import request from 'request-promise';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';

const defaults = {
  host: 'https://api.dc01.gamelockerapp.com/shards/',
  region: 'na',
  statusUrl: 'https://api.dc01.gamelockerapp.com/status',
  title: 'semc-vainglory',
};

const ERRORS = {
  rated: 'You have hit the rate limit.  Free for non-commercial use for up to 10 requests per minute! To increase your rate limit, please contact api@superevilmegacorp.com',
  auth: 'Unauthorized, invalid API key provided.',
  unknown: 'Unknown error, please try your request again.',
  empty: 'Data not found',
};

export default class Http {
  constructor(apiKey = null, options = defaults) {
    const requestOptions = { ...defaults, ...options };
    this.options = {
      url: `${requestOptions.host}${requestOptions.region}/`,
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
          if (isPlainObject(obj[property])) {
            loop(obj[property], property);
          } else if (isArray(obj[property])) {
            if (prefix) {
              queries.push(`${prefix}[${encodeURIComponent(property)}]=${obj[property].join(',')}`);
            } else {
              queries.push(`${encodeURIComponent(property)}=${obj[property].join(',')}`);
            }
          } else {
            if (prefix) {
              queries.push(`${prefix}[${encodeURIComponent(property)}]=${obj[property]}`);
            } else {
              queries.push(`${encodeURIComponent(property)}=${obj[property]}`);
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
      const messages = this.parseErrors(body.errors);
      return { error: true, messages };
    }

    return body;
  }

  parseErrors(errors) {
    return errors.map((err) => {
      switch (err.title) {
        case 'Unauthorized':
          return ERRORS.auth;
        case 'Not Found':
          return ERRORS.empty;
        default:
          return ERRORS.unknown;
      }
    });
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
      console.log(requestOptions.url);
    }

    try {
      const body = await request(requestOptions);
      if (!body) {
        return { error: true, messages: ['NO DATA'] };
      }
      const parsedBody = this.parseBody(body, options);

      if (parsedBody.error) {
        return new Error(parsedBody.messages);
      }

      return parsedBody;
    } catch (e) {
      return new Error(e);
    }
  }
}
