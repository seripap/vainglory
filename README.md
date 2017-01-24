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

## Documentation

### Reference

Official [API Reference](http://developer.vainglorygame.com/docs). The methods are named with references from the API documentation. All methods will return a promise.

### Matches

* [`collection`](#matchesCollection)
* [`single`](#matchesSingle)

### Players

* [`single`](#playersSingle)

---------------------------------------

## Matches

`vainglory.matches` 

<a name="matchesCollection" />
#### collection({...options})
##### [Reference](http://developer.vainglorygame.com/docs/#get-a-collection-of-matches)

Retrieves all matches.

__Arguments__
- `options` [*Object*] - Query paramaters

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

<a name="matchesSingle" />
#### single(matchId)
##### [Reference](http://developer.vainglorygame.com/docs/#get-a-single-match).

Retreives a single match by ID.

__Arguments__
- `matchId` [*String*] - The ID of match to retrieve

__Example__
```javascript
const matchId = '0123b560-d74c-11e6-b845-0671096b3e30';

vainglory.matches.single(matchId).then((matches) => {
    // do something with matches
}).catch((errorMsg) => {
  console.error(errorMsg);
});
```

---------------------------------------

## Players

`vainglory.players` 

<a name="playersSingle" />
#### single(playerId)
##### [Reference](http://developer.vainglorygame.com/docs/#get-a-single-player)

Retreives a player by playerId.

__Arguments__
- `playerId` [*String*] - The ID of player to retrieve

__Example__
```javascript
const playerId = '6abb30de-7cb8-11e4-8bd3-06eb725f8a76';

vainglory.players.single(playerId).then((player) => {
    // do something with player
}).catch((errorMsg) => {
  console.error(errorMsg);
});
```
