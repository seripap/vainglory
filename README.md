# Work In Progress

This client is very alpha, consider it not stable and do not use it- yet. The endpoints may change without notices and methods may be renamed. This is a **very** premature project.

# Vainglory.js - A Javascript API Client

[![Build Status](https://travis-ci.org/seripap/vainglory.svg?branch=master)](https://travis-ci.org/seripap/vainglory)

This is a premature API client for [Vainglory](http://vainglorygame.com).

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

## Tests

```
$ yarn test
```

## Reference
Official [API Reference](http://developer.vainglorygame.com/api). The methods are named with references from the API documentation. All methods will return a promise.

```
    vainglory...then(results => results).catch(err => err);
```

## Matches

`vainglory.matches` 

#### searchPlayers(players, {...options})

Searches for players in matches

__Arguments__
* `players` - Array of strings `Array`
* `options` - Options Object `Object` 

__Options__
* `gameType` - Defaults 'string' `String`
* `actor` - Defaults 'string' `String`
* `startTime` - Defaults '0' `Integer`
* `endTime` - Defaults '0' `Integer`

__Example__
```javascript
const players = ['famous', 'dan', 'vaingloryPerson'];
vainglory.matches.searchPlayers(players).then((matches) => {
    // do something with matches
});

const options = {
    gameType: 'string',
    actor: 'string',
    startTime: 0,
    endTime: 0,
};
vainglory.matches.searchPlayers(players, options).then((matches) => {
    // do something with matches
});
```

#### searchUuid(uuid, startTime, endTime, shouldResolve)

Searches for match on UUID. If shouldResolve is `true`, aggregated data of the inner results will be returned.

__Arguments__
* `uuid` - UUID of match to search `String`
* `startTime` - Start time to query `Integer` 
* `endTime` - End time to query `Integer` 
* `shouldResolve` - Resolving inner URLs (defaults true)

```javascript
const uuid = '12345-123';
vainglory.matches.searchPlayers(uuid).then((results) => {
    // do something with results
})
```

### Meta (INACTIVE)

`vainglory.meta` 

#### status()

Returns a boolean of current status.

__Example__
```javascript
    vainglory.meta.status();
```
