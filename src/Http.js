import fetch from 'node-fetch';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import { RATE_LIMIT, UNAUTHORIZED, UNKNOWN, NOT_FOUND, INTERNAL, NO_BODY, OFFLINE, NOT_ACCEPTABLE, NETWORK_ERROR } from './Errors';

const defaults = {
  host: 'https://api.dc01.gamelockerapp.com/shards/',
  region: 'na',
  statusUrl: 'https://api.dc01.gamelockerapp.com/status',
  title: 'semc-vainglory',
};

export default class Http {
  constructor(apiKey = null, options = defaults) {
    const requestOptions = { ...defaults, ...options };
    this._tempRegion = null;
    this._region = requestOptions.region.toLowerCase(),
    this.options = {
      url: `${requestOptions.host}`,
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

  getRequestedRegion() {
    return this.tempRegion ? this.tempRegion : this.region;
  }

  set tempRegion(newTempRegion) {
    this._tempRegion = newTempRegion;
    return this;
  }

  get tempRegion() {
    return this._tempRegion;
  }

  set region(newRegion) {
    this._region = newRegion;
    return this;
  }

  get region() {
    return this._region;
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

  parseErrors(status, requestOptions, rateLimit) {
    const err = { errors: true };
    const region = this.getRequestedRegion();
    switch (status) {
      case 401:
        return { ...err, messages: UNAUTHORIZED, region, debug: requestOptions, rateLimit };
      case 404:
        return  { ...err, messages: NOT_FOUND, region, debug: requestOptions, rateLimit };
      case 500:
        return  { ...err, messages: INTERNAL, region, debug: requestOptions, rateLimit };
      case 429:
        return  { ...err, messages: RATE_LIMIT, region, debug: requestOptions, rateLimit };
      case 503:
        return  { ...err, messages: OFFLINE, region, debug: requestOptions, rateLimit };
      case 406:
        return  { ...err, messages: NOT_ACCEPTABLE, region, debug: requestOptions, rateLimit };
      default:
        return  { ...err, messages: UNKNOWN, region, debug: requestOptions, rateLimit };
    }
  }

  status() {
    return fetch(this.options.status);
  }

  parseRateLimit(headers) {
    return {
      limit: headers.get('x-ratelimit-limit'),
      remaining: headers.get('x-ratelimit-remaining'),
      reset: headers.get('x-ratelimit-reset'),
      requestId: headers.get('x-request-id'),
    }
  }

  execute(method = 'GET', endpoint = null, query = null) {
    const requestOptions = { ...this.options };
    if (endpoint === null) {
      return new Error('HTTP Error: No endpoint to provide a request to.');
    }

    const region = this.getRequestedRegion();

    requestOptions.url += `${region}/`;
    requestOptions.url += endpoint;

    if (query) {
      requestOptions.url += `?${this.serialize(query)}`;
    }

    return new Promise((resolve, reject) => {
      let rateLimit = null;
      this.tempRegion = null;

      fetch(requestOptions.url, {
        method: requestOptions.method,
        headers: requestOptions.headers,
      }).then((res) => {
        rateLimit = this.parseRateLimit(res.headers);
        if (res.status !== 200) {
          return this.parseErrors(res.status, requestOptions, rateLimit);
        }
        return res.json();
      }).then((body) => {
        // Empty responses
        if (!body) {
          return reject({ errors: true, messages: NO_BODY, region, debug: requestOptions, rateLimit });
        }
        // Status code not 200
        if (body.errors) {
          return reject({ ...body, region, debug: requestOptions, rateLimit });
        }

        return resolve({
          errors: null,
          body,
          region,
          debug: requestOptions,
          rateLimit,
        });
      }).catch((err) => {
        return reject({
          errors: true,
          messages: NETWORK_ERROR,
          region,
          details: err,
          debug: requestOptions,
          rateLimit,
        });
      });
    });
  }
}
