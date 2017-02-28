import fetch from 'node-fetch';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import { RATE_LIMIT, UNAUTHORIZED, UNKNOWN, NOT_FOUND, INTERNAL, NO_BODY, OFFLINE, NOT_ACCEPTABLE, NETWORK_ERROR } from './Errors';

const defaults = {
  host: 'https://api.dc01.gamelockerapp.com/shards/',
  suffix: '/shards/',
  region: 'na',
  statusUrl: 'https://api.dc01.gamelockerapp.com/status',
  title: 'semc-vainglory',
};

export default class Http {
  constructor(apiKey = null, options = defaults) {
    const requestOptions = { ...defaults, ...options };
    this.options = {
      url: `${requestOptions.host}${requestOptions.region.toLowerCase()}/`,
      status: requestOptions.statusUrl,
      headers: {
        'Content-Encoding': 'gzip',
        'Content-Type': 'application/json',
        'User-Agent': 'js/vainglory',
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${apiKey}`,
        'X-TITLE-ID': requestOptions.title,
      },
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

    if (body && 'errors' in body) {
      if (body.errors.title) {
        return { error: true, messages: body.errors.title };
      }
      return { error: true, messages: body.errors };
    }

    return body;
  }

  parseErrors(status) {
    const err = { error: true };
    switch (status) {
      case 401:
        return { ...err, messages: UNAUTHORIZED };
      case 404:
        return  { ...err, messages: NOT_FOUND };
      case 500:
        return  { ...err, messages: INTERNAL };
      case 429:
        return  { ...err, messages: RATE_LIMIT };
      case 503:
        return  { ...err, messages: OFFLINE };
      case 406:
        return  { ...err, messages: NOT_ACCEPTABLE };
      default:
        return  { ...err, messages: UNKNOWN };
    }
  }

  status() {
    return fetch(this.options.status).then(res => res.json()).catch(e => e);
  }

  execute(method = 'GET', endpoint = null, query = null, options = {}) {
    const requestOptions = { ...this.options, options };

    if (endpoint === null) {
      return new Error('HTTP Error: No endpoint to provide a request to.');
    }

    requestOptions.url += endpoint;

    if (query) {
      requestOptions.url += `?${this.serialize(query)}`;
    }

    return new Promise((resolve, reject) => {
      fetch(requestOptions.url, {
        method: requestOptions.method,
        headers: requestOptions.headers,
      }).then((res) => {
        if (res.status !== 200) {
          return reject(this.parseErrors(res.status));
        }
        return res.json();
      }).then((body) => {
        if (!body) {
          return reject(NO_BODY);
        }

        const parsedBody = this.parseBody(body, options);

        if (parsedBody && parsedBody.error) {
          reject (parsedBody.messages);
        }

        return resolve(parsedBody);
      }).catch((err) => {
        return reject({
          error: true,
          message: NETWORK_ERROR,
          details: err,
        });
      });
    });
  }
}
