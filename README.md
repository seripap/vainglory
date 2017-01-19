# Work In Progress

This client is very alpha, consider it not stable and do not use it- yet. The endpoints may change without notices and methods may be renamed. This is a **very** premature project.

# Vainglory.js - A Javascript API Client

[![Build Status](https://travis-ci.org/seripap/vainglory.svg?branch=master)](https://travis-ci.org/seripap/vainglory)

This is an API client for [Vainglory](http://vainglorygame.com).

## Installation

```
$ yarn add vainglory
# or npm install vainglory
```

To initalize the library

```javascript
import Vainglory from 'vainglory';

const vainglory = new Vainglory('api-key');
```

To modify HTTP options, provide an options object

```javascript
import Vainglory from 'vainglory';

/* defaults */
const options = {
  host: 'https://api.dc01.gamelockerapp.com/shards/na/',
  title: 'semc-vainglory',
};

const vainglory = new Vainglory('api-key', options);
```

## Examples

```
$ yarn run example
```

## Tests

```
$ yarn test
```

## Reference
Official [API Reference](http://developer.vainglorygame.com/docs). The methods are named with references from the API documentation. All methods will return a promise.

```
    vainglory...then(results => results).catch(err => err);
```

## Matches

`vainglory.matches` 

#### collection({...options})

Retrieves all matches. [Query Paramters](http://developer.vainglorygame.com/docs/#get-a-collection-of-matches)

__Example__
```javascript
/* defaults */
const options = {
  page: {
    offset: 0,
    limit: 50,
  },
  sort: 'createdAt',
  filters: {
    started: '3hrs ago',
    ended: 'Now',
    playerNames: [],
    teamNames: [],
  }
}
vainglory.matches.collection(options).then((matches) => {
    // do something with matches
}).catch((errorMsg) => {
  console.error(errorMsg);
});
```
