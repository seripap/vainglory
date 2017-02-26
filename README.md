# Vainglory.js(BETA) - A Javascript API Client for Vainglory

[![Build Status](https://travis-ci.org/seripap/vainglory.svg?branch=master)](https://travis-ci.org/seripap/vainglory)

This is a Javascript API client for [Vainglory](http://vainglorygame.com). This client is still in active development, please excuse the tests, they still need to be mocked.

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

## Options

Base options can be modified by passing an object during initalization.

__Properties__
- `host` [*String*] - HTTP Url to call
- `title` [*String*] - X-TITLE-ID modifier


```javascript
import Vainglory from 'vainglory';

/* defaults */
const options = {
  host: 'https://api.dc01.gamelockerapp.com/shards/na/',
  title: 'semc-vainglory',
  remapped: true
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

All methods are named references from the [Official API Reference](http://developer.vainglorygame.com/docs). All methods will return a promise.

### Matches

* [`collection`](#matchesCollection)
* [`single`](#matchesSingle)

### Players

* [`getById`](#playersId)
* [`getByName`](#playersName)

---------------------------------------
## Base Model

All single results are wrapped with a model for easier data digesting. You can request any data that comes back from the request.

- `.type` - Returns the type of data requested
- `.id` - Returns associated ID

## Remapped items vs server names

For fields in `participant` such as `actor` or `itemGrants`, server will return `*1000_Item_HalcyonPotion*`. The client will return `Halcyon Potion` automatically based on field mappings. If you would like the original response, instead of calling `.stats` directly, use `_.stats` or `._actor` instead of `.actor`.

---------------------------------------
## Matches

`vainglory.matches` 

<a name="matchesCollection" />
#### collection({...options})

Retrieves all matches. [Reference](http://developer.vainglorygame.com/docs/#get-a-collection-of-matches)

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
  filter: {
    'createdAt-start': '3hrs ago', // TODO: Parse times (soon!)
    'createdAt-end': 'Now', // TODO: Parse times (soon!)
    playerNames: [],
    teamNames: [],
  }
}
vainglory.matches.collection(options).then((matches) => {
    // matches is an object representation of that dataset;
    // matches.match[n -> limit].rosters , ..etc, etc
}).catch((errorMsg) => {
  console.error(errorMsg);
});
```

<a name="matchesSingle" />
#### single(matchId)

Retreives a single match by ID. [Reference](http://developer.vainglorygame.com/docs/#get-a-single-match)

__Arguments__
- `matchId` [*String*] - The ID of match to retrieve

__Example__
```javascript
const matchId = '0123b560-d74c-11e6-b845-0671096b3e30';

vainglory.matches.single(matchId).then((match) => {
  console.log(match.id);
  console.log(match.stats);
}).catch((errorMsg) => {
  console.error(errorMsg);
});
```

---------------------------------------

## Players

`vainglory.players` 

<a name="playersId" />
#### getById(playerId)

Retreives a player by playerId. [Reference](http://developer.vainglorygame.com/docs/#get-a-single-player)

__Arguments__
- `playerId` [*String*] - The ID of player to retrieve

__Example__
```javascript
const playerId = '6abb30de-7cb8-11e4-8bd3-06eb725f8a76';

vainglory.players.getById(playerId).then((player) => {
  console.log(player.id);
  console.log(player.stats);
}).catch((errorMsg) => {
  console.error(errorMsg);
});
```

<a name="playersName" />
#### getByName(playerName)

Retreives a player by playerName. [Reference](http://developer.vainglorygame.com/docs/#get-a-single-player)

__Arguments__
- `playerName` [*String*] - The name of player to retrieve.

__Example__
```javascript
const playerName = 'famous';

vainglory.players.getByName(playerName).then((player) => {
  console.log(player.id);
  console.log(player.stats);
}).catch((errorMsg) => {
  console.error(errorMsg);
});
```
