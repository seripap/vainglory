# Vainglory.js(BETA) - A Javascript API Client for Vainglory

[![Build Status](https://travis-ci.org/seripap/vainglory.svg?branch=master)](https://travis-ci.org/seripap/vainglory) [![npm](https://img.shields.io/npm/v/vainglory.svg)](https://www.npmjs.com/package/vainglory)

**CURRENTLY IN ACTIVE DEVELOPMENT**

This is a Javascript API client for [Vainglory](http://vainglorygame.com).

There will be a lot of updates prior to [v1.0.0](https://github.com/seripap/vainglory/issues/1). If you are using this package, always update to the [latest version](https://github.com/seripap/vainglory/releases) to ensure API alignment and data accuracy.

If you run into problems or find bugs, [file an issue](https://github.com/seripap/vainglory/issues).

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
- `region` [*String*] - Use: `na` (North America), `sg` (SEA), `eu` (Europe)

```javascript
import Vainglory from 'vainglory';

/* defaults */
const options = {
  host: 'https://api.dc01.gamelockerapp.com/shards/',
  region: 'na',
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

All methods are named references from the [Official API Reference](http://developer.vainglorygame.com/docs). All methods will return a promise.

* [`status`](#apiStatus)

### Matches
* [`collection`](#matchesCollection)
* [`single`](#matchesSingle)

### Players

* [`getById`](#playersId)
* [`getByName`](#playersName)

### Errors

All responses have a `.errors` property that will be either `null` or `true`. If `true`, `.message` will be defined with the error message.

__Example__

```
{ error: true, message: 'Expected a string for playerName' }
```

---------------------------------------
<a name="apiStatus" />
## Status

`vainglory.status`

Returns API meta information.

```javascript
vainglory.status().then((info) => console.log(info));
```

Example Response

```
{ 
  id: 'gamelocker', // From server
  releasedAt: '2017-02-24T20:44:05Z', // From server
  version: 'gamelockerd-v4.0.2', // From server
  clientVersion: '0.8.1' // From VaingloryJS
}
```
---------------------------------------
## Matches

`vainglory.matches` 

<a name="matchesCollection" />
#### .collection({...options})

Retrieves all matches. [Reference](http://developer.vainglorygame.com/docs/#get-a-collection-of-matches)

__Arguments__
- `options` [*Object*] - Query paramaters

```javascript
const now = new Date();
const minus3Hours = new Date(new Date() * 1 - 1000 * 3600 * 3);

/* defaults */
const options = {
  page: {
    offset: 0,
    limit: 50,
  },
  sort: 'createdAt', // -createdAt for reverse
  filter: {
    'createdAt-start': minus3Hours.toISOString(), // ISO Date
    'createdAt-end': now.toISOString(), // ISO Date
    playerNames: [], // Array
    teamNames: [], // Array
  },
};
```

__Returns__
- [Matches](#matchesModel)

__Example__
```javascript
vainglory.matches.collection(options).then((matches) => {
  console.log(matches);
}).catch((errors) => {
  console.log(errors);
});
```

<a name="matchesSingle" />
#### .single(matchId)

Retreives a single match by ID. [Reference](http://developer.vainglorygame.com/docs/#get-a-single-match)

__Arguments__
- `matchId` [*String*] - The ID of match to retrieve

__Returns__
- [Match](#matchModel)

__Example__
```javascript
const matchId = '0123b560-d74c-11e6-b845-0671096b3e30';

vainglory.matches.single(matchId).then((match) => {
  if (match.errors) return;
  console.log(match);
}).catch((errors) => {
  console.log(errors);
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

__Returns__
- [Player](#playerModel)

__Example__
```javascript
const playerId = '6abb30de-7cb8-11e4-8bd3-06eb725f8a76';

vainglory.players.getById(playerId).then((player) => {
  if (player.errors) return;
  console.log(player);
}).catch((errors) => {
  console.log(errors);
});
```

<a name="playersName" />
#### getByName(playerName)

Retreives a player by playerName. [Reference](http://developer.vainglorygame.com/docs/#get-a-single-player)

__Arguments__
- `playerName` [*String*] - The name of player to retrieve.

__Returns__
- [Player](#playerModel)

__Example__
```javascript
const playerName = 'famous';

vainglory.players.getByName(playerName).then((player) => {
  if (player.errors) return;
  console.log(player.id);
  console.log(player.stats);
}).catch((errors) => {
  console.log(errors);
});
```

---------------------------------------
## Models

All results are wrapped with a model for easier data digesting. You can request any data that comes back from the request.

- `.type` - Returns the type of data requested
- `.id` - Returns associated ID
- `.raw` - Returns raw data from server

#### Remapped items vs server names

For fields in `participant` such as `actor` or `itemGrants`, server will return `*1000_Item_HalcyonPotion*`. The client will return `Halcyon Potion` automatically based on field mappings. If you would like the original response, instead of calling `.stats` directly, use `._stats` or `._actor` instead of `.actor`.

<a name="matchesModel" />
### Matches

- [`.match`](#matchModel) - Array of Match

<a name="matchModel" />
### Match

[Ref](https://developer.vainglorygame.com/docs#matches)

- `.createdAt`
- `.duration`
- `.gameMode`
- `.patchVersion`
- `.shardId`
- `.stats`
- `.titleId`
- `.rosters` - Array of [Roster](#rosterModel)

<a name="rosterModel" />
### Roster

[Ref](https://developer.vainglorygame.com/docs#rosters)

- `.stats`
- `.participants` - Array of [Participant](#participantModel)

<a name="participantModel" />
### Participant

[Ref](https://developer.vainglorygame.com/docs#participants)

- `._actor`
- `.actor`
- `._stats`
- `.stats`
- `.player` - [Player](#playerModel)

<a name="playerModel" />
### Player

- `.name`
- `.shardId`
- `.stats`
- `.titleId`
