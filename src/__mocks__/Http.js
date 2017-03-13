import fetch from 'node-fetch';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import { RATE_LIMIT, UNAUTHORIZED, UNKNOWN, NOT_FOUND, INTERNAL, NO_BODY, OFFLINE, NOT_ACCEPTABLE, NETWORK_ERROR } from '../Errors';

// MOCK DATA
import matchCollection from './matchCollection.json';
import matchSingle from './matchSingle.json';
import playerByName from './playerByName.json';
import playerById from './playerById.json';

const defaults = {
  host: 'https://FAKE-HOST-FOR-TESTING.com/',
  suffix: '/shards/',
  region: 'na',
  statusUrl: 'https://FAKE-HOST-FOR-TESTING.com/',
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
    return fetch(this.options.status);
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

      if (requestOptions.url === 'https://FAKE-HOST-FOR-TESTING.com/na/matches?page[offset]=0&page[limit]=5&sort=createdAt&filter[createdAt-start]=fake-time&filter[createdAt-end]=fake-time') {
        const parsedBody = this.parseBody(matchCollection, true);
        return resolve({
          error: false,
          parsedBody,
        });
      }

      if (requestOptions.url === 'https://FAKE-HOST-FOR-TESTING.com/na/matches/f31b614a-fbbb-11e6-9ec9-062445d3d668') {
        const parsedBody = this.parseBody(matchSingle, true);
        return resolve({
          error: false,
          parsedBody,
        });
      }

      if (requestOptions.url === 'https://FAKE-HOST-FOR-TESTING.com/na/players?filter[playerNames]=famous') {
        const parsedBody = this.parseBody(playerByName, true);
        return resolve({
          error: false,
          parsedBody,
        });
      }
      if (requestOptions.url === 'https://FAKE-HOST-FOR-TESTING.com/na/players/d4844ad0-7017-11e4-8e49-062d0b175276') {
        const parsedBody = this.parseBody(playerById, true);
        return resolve({
          error: false,
          parsedBody,
        });
      }

  console.log(requestOptions.url);


    });
  }
}
