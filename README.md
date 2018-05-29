# Vainglory.js

[![Build Status](https://travis-ci.org/seripap/vainglory.svg?branch=master)](https://travis-ci.org/seripap/vainglory) [![npm](https://img.shields.io/npm/v/vainglory.svg)](https://www.npmjs.com/package/vainglory)

This is a Javascript API client wrapper for [Vainglory](http://vainglorygame.com). If you run into problems or find bugs, [file an issue](https://github.com/seripap/vainglory/issues).

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

<a name="options" />

## Options

Base options can be modified by passing an object during initalization.

__Properties__
- `host` [*String*] - HTTP Url to call
- `title` [*String*] - X-TITLE-ID modifier
- `region` [*String*] - Region of which game data to request (`na`, `eu`, `sa`, `ea`, `sg`) [Reference](https://developer.vainglorygame.com/docs#regions)

```javascript
import Vainglory from 'vainglory';

// Defaults
const options = {
  host: 'https://api.dc01.gamelockerapp.com/shards/',
  region: 'na',
  title: 'semc-vainglory',
};

const vainglory = new Vainglory('api-key', options);
```

<a name="documentation" />

## Documentation

### Reference

All methods are named references from the [Official API Reference](http://developer.vainglorygame.com/docs). All methods will return a promise.

* [`Errors`](#errors)
* [`RateLimits`](#rateLimits)
* [`Telemetry`](#telemetry)
* [`status`](#apiStatus)
* [`region`](#apiRegion)
* [`setRegion`](#apiSetRegion)
* [`models`](#apiModels)

<a name="matchesTOC" />

### Matches

* [`collection`](#matchesCollection)
* [`single`](#matchesSingle)

<a name="playersTOC" />

### Players

* [`getById`](#playersId)
* [`getByName`](#playersName)

<a name="tournamentTOC" />

### Tournament

* [`region`](#tournament)

<a name="errors" />

### Errors

You can check on the property `.errors` to determine if a response has errored and the [subsequent message that follows](https://developer.vainglorygame.com/docs#errors). `.debug` will provide request and header information.

__Example__

```
{ errors: true,
  messages: 'The specified object could not be found.',
  region: 'na',
  debug:
   { url: 'https://api.dc01.gamelockerapp.com/shards/na/matches?page[offset]=0&page[limit]=50&sort=createdAt&filter[createdAt-start]=2017-03-02T00:28:32.721Z&filter[createdAt-end]=2017-03-02T03:28:32.721Z&filter[playerNames]=&filter[teamNames]=',
     status: 'https://api.dc01.gamelockerapp.com/status',
     headers:
      { 'Content-Encoding': 'gzip',
        'Content-Type': 'application/json',
        'User-Agent': 'js/vainglory',
        Accept: 'application/vnd.api+json',
        Authorization: 'Bearer aaa.bbb.ccc',
        'X-TITLE-ID': 'semc-vainglory' 
      } 
    } 
  },
  rateLimit:
    { limit: '10',
      remaining: '9',
      reset: '6000000000',
      requestId: 'some-arbitrary-id' } 
    }
```

<a name="rateLimits" />

### Rate Limits

Rate limit information is attached to every request. All models will return `.rateLimit`, see the [Reference](https://developer.vainglorygame.com/docs#rate-limits) for more information or if you need to increase your rate limit.

```
  rateLimit:
    { limit: '10',
      remaining: '9',
      reset: '6000000000',
      requestId: 'some-arbitrary-id' } 
    }
```

<a name="telemetry" />

### Telemetry

Telemetry data can be retrieved from the `match` model under assets. Assets is an array of [asset](#assetModel).

__Example__

```javascript
const matchId = 'f5373c40-0aa9-11e7-bcff-0667892d829e';
vainglory.matches.single(matchId).then((match) => {
  console.log(match.assets) // array of asset
}).catch((err) => console.error(err));
```

### .resolve()

If you would like to resolve telemetry data, you can call `.resolve()` directly on the asset. Note that this currently returns the raw data that is associated with `.URL`.

```javascript
const matchId = 'f5373c40-0aa9-11e7-bcff-0667892d829e';
vainglory.matches.single(matchId).then(async (match) => {
  const telemetry = await match.assets[0].resolve();
  console.log(telemetry);
}).catch((err) => console.error(err));
```

---------------------------------------
<a name="apiStatus" />

## Status

`vainglory.status`

Returns API meta information.

```javascript
vainglory.status().then((info) => console.log(info));
```

__Example Response__

```
{ 
  id: 'gamelocker', // From server
  releasedAt: '2017-02-24T20:44:05Z', // From server
  version: 'gamelockerd-v4.0.2', // From server
  clientVersion: '0.8.1' // From VaingloryJS
}
```

<a name="apiRegion" />

## region

`vainglory.region`

Changes the region for the current request.

```javascript
vainglory.region('sg').matches... // will return data from `sg` region
vainglory.matches... // data from the region that was initialized (defaults to na)
vainglory.players... // data from the region that was initialized (defaults to na)
```

<a name="apiSetRegion" />

## setRegion

`vainglory.setRegion`

Sets the region for the instance.

```javascript
vainglory.setRegion('sg'); // Overwrites parent 
vainglory.matches... // will return data from `sg` region
vainglory.players... // will return data from `sg` region
```

<a name="apiModels" />

## models

`vainglory.models`

Exposed data models. See mock data in tests to see how data should be referenced.

```javascript
const match = new vainglory.models.match({data: ...match});
const matches = new vainglory.models.matches({data: ...matches});
const player = new vainglory.models.player({data: ...player});
const participant = new vainglory.models.participant({data: ...participant});
const roster = new vainglory.models.roster({data: ...roster});
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
const minus28days = new Date();

minus28Days.setDate(now.getDate() - 28);

/* defaults */
const options = {
  page: {
    offset: 0,
    limit: 50,
  },
  sort: 'createdAt', // -createdAt for reverse
  filter: {
    'createdAt-start': minus28days.toISOString(), // ISO Date
    'createdAt-end': now.toISOString(), // ISO Date
    playerNames: [],
    teamNames: [],
  },
};
```

__Returns__
- [Matches](#matchesModel)

__Example__
```javascript
vainglory.matches.collection(options).then((matches) => {
  if (matches.errors) {
    return console.log(matches);
  }
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

Retreives a **single** player by playerId. [Reference](http://developer.vainglorygame.com/docs/#get-a-single-player)

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

#### getByName(playerNames)

Retreives players by playerName. [Reference](http://developer.vainglorygame.com/docs/#get-a-single-player)

__Arguments__
- `playerNames` [*Array*] - The name of players to retrieve. Max length of 6.

__Returns__
- [Players](#playersModel)

__Example__
```javascript
const playerNames = ['famous'];

vainglory.players.getByName(playerNames).then((players) => {
  if (players.errors || players.player) return;
  players.player.forEach(player => {
    console.log(player.id);
    console.log(player.stats);
  }
}).catch((errors) => {
  console.log(errors);
});
```

---------------------------------------

## Tournament

`vainglory.tournament` 

<a name="tournament" />

#### region(region)

Tournament data is stored in seperate shards as they take place on a private client. After you call region, you can bind the same methods you would use to call matches or player data. [Reference](https://developer.vainglorygame.com/docs#content-negotiation)

__Arguments__
- `region` [*String*] - **Optional** - Region of which tournament data to request (`na`, `eu`, `sa`, `ea`, `sg`). Note if this is blank, it will request whichever region data that was specified from `setRegion` or `region` [Reference](https://developer.vainglorygame.com/docs#regions)

__Returns__
- [Match](#matchesTOC)
- [Player](#playerTOC)

__Example__
```javascript
// Referencing Mathces
vainglory.tournament.region('na').matches.collection().then((matches) => {
  console.log(matches);
}).catch((err) => console.log(err));

// Or referencing Players
const playerNames = ['SOMEONE','SOMEONE_ELSE'];

vainglory.tournament.region('na').players.getByName(playerNames).then((players) => {
  console.log(players);
}).catch((err) => console.log(err));
```

---------------------------------------
## Models

All results are wrapped with its respective data model.

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

- `.assets` - Array of [Asset](#assetModel)
- `.createdAt` - a string, the match timestamp, suitable for passing to JavaScript `Date` constructor.  Note that this is the time when the match was initiated, which is the start of the hero pick phase.  To find when the first spawns on the map were, see the timestamps on individual events in the telemetry data.
- `.duration` - an integer, match duration in seconds
- `.gameMode` - a string, such as `"Casual 5v5"` ([see full list here](src/models/resources/gameModes.js))
- `.patchVersion` - a string, which Vainglory update the match was played on, such as `"3.1"`
- `.shardId` - a string, the region from which the match was fetched, in lower case, such as `"na"`
- `.stats` - an object with these attributes:
   - `endGameReason` - a string, such as `"victory"` or `"surrender"`
   - `queue` - a string, such as `"5v5_pvp_ranked"`
- `.titleId` - always the string `"semc-vainglory"`
- `.rosters` - Array of [Roster](#rosterModel)

<a name="assetModel" />

### Asset

[Ref](https://developer.vainglorygame.com/docs#telemetry)

- `.URL` - a string, the URL of where to download the asset
- `.contentType` - this field is not always present
- `.createdAt` - match timestamp as a string, suitable for passing to JavaScript `Date` constructor
- `.description` - this field is not always present, and is sometimes the empty string
- `.filename` - meaning uncertain
- `.name` - a string, such as `"telemetry"`
- `.resolve()` - Returns promise; resolves `.URL` data

<a name="rosterModel" />

### Roster

[Ref](https://developer.vainglorygame.com/docs#rosters)

- `.stats` - an object with these attributes:
   - `acesEarned` - an integer, total number of aces earned by the team in the match
   - `gold` - an integer, total gold earned by the team in the match
   - `heroKills` - an integer, total number of hero kills earned by the team in the match
   - `krakenCaptures` - an integer, total number of times the team captured the Kraken in the match
   - `side` - a string, either `"left/blue"` or `"right/red"`
   - `turretKills` - an integer, total number of turrets the team destroyed in the match
   - `turretsRemaining` - an integer, total number of turrets the team had remaining on their side at match end
- `.participants` - Array of [Participant](#participantModel)

<a name="participantModel" />

### Participant

[Ref](https://developer.vainglorygame.com/docs#participants)

- `._actor` - original actor data before this module did cleanup on it
- `.actor` - name of hero used by this participant, as a string ([see hero name cleanup details here](https://github.com/seripap/vainglory/blob/master/src/models/participant.js#L42))
- `._stats` - original stats data before this module did cleanup on it
- `.stats` - cleaned up participant stats, an object with these attributes:
   - `assists` - an integer, the number of assists the player did (the third number in KDA)
   - `crystalMineCaptures` - an integer, the number of times the player killed the crystal sentry
   - `deaths` - an integer, number of times the player died (the second number in KDA)
   - `farm` - an integer, meaning unclear, possibly number of monsters/minions killed
   - `firstAfkTime` - an integer, the number of seconds into the match the player first went AFK, or -1 if they never did
   - `gold` - a number (not usually an integer), total gold earned by this player throughout the match
   - `goldMineCaptures` - an integer, the number of times the player killed the gold miner
   - `itemGrants` - an object whose keys are the names of the items the player purchased, and whose values are the number of times the player purchased that item; example: `{"Weapon Blade":2,"Six Sins":1,"Heavy Steel":1,"Sorrowblade":1,...}`
   - `itemSells` - similar in structure to the previous, but for selling items
   - `itemUses` - an object whose keys are the names of items the player used, and whose values are the number of times the player used the item; example: `{"Travel Boots":3,"Scout Cam":3,...}`
   - `items` - array of strings, all items the player possessed at the end of the match
   - `jungleKills` - number of kills in jungle camps
   - `karmaLevel` - a string, one of the three [listed here](src/models/resources/karma.js)
   - `kills` - an integer, the number of kills the player did (the first number in KDA)
   - `krakenCaptures` - an integer, the number of times the player captured the Kraken
   - `level` - an integer, the level of the player (in the sense of gaining experience post-match to level up your account)
   - `minionKills` - an integer, the number of minions the player killed (including jungle creeps)
   - `nonJungleMinionKills` - an integer, the number of minions the player killed (excluding jungle creeps)
   - `skillTier` - a string such as `"Rock Solid - Gold"`, as provided by [this lookup table](src/models/resources/skillTiers.js)
   - `skinKey` - a string naming the skin the player used, such as `"Gwen_DefaultSkin"`
   - `turretCaptures` - an integer, the number of turrets the player destroyed
   - `wentAfk` - a boolean (true or false), whether the player went AFK during the match
   - `winner` - a boolean (true or false), whether the player was on the winning team
- `.player` - [Player](#playerModel)

<a name="playersModel" />

### Players

- `.player` - Array of [Player](#playerModel)

<a name="playerModel" />

### Player

- `.name` - a string, the player's IGN
- `.shardId` - region from which the match was fetched, in lower case (e.g., `"na"`)
- `.stats` - an object with the following attributes:
   - `elo_earned_season_4` - deprecated; use `rankPoints` instead, documented below
   - `elo_earned_season_5` - deprecated; use `rankPoints` instead, documented below
   - `elo_earned_season_6` - deprecated; use `rankPoints` instead, documented below
   - `elo_earned_season_7` - deprecated; use `rankPoints` instead, documented below
   - `elo_earned_season_8` - deprecated; use `rankPoints` instead, documented below
   - `elo_earned_season_9` - deprecated; use `rankPoints` instead, documented below
   - `gamesPlayed` - object whose keys are various match types (aral, blitz, blitz_rounds, casual, casual_5v5, ranked, etc.) and whose values are the number of times the player has played that match type
   - `guildTag` - a string of up to 4 characters, the player's guild tag, or the empty string if the player has no guild
   - `karmaLevel` - an integer, one of the three [listed here](src/models/resources/karma.js)
   - `level` - an integer, the level of the player (in the sense of gaining experience post-match to level up your account)
   - `lifetimeGold` - meaning unclear
   - `lossStreak` - number of matches the player has lost in a row, or 0 if the last match was a win (but sometimes this number and `winStreak` are both zero, impossibly)
   - `played` - meaning unclear
   - `played_aral` - deprecated; use `gamesPlayed` instead, documented above
   - `played_blitz` - deprecated; use `gamesPlayed` instead, documented above
   - `played_casual` - deprecated; use `gamesPlayed` instead, documented above
   - `played_ranked` - deprecated; use `gamesPlayed` instead, documented above
   - `rankPoints` - an object whose keys are `"blitz"` and `"ranked"` and whose values are the player's precise numerical ranks in each of those match types (5v5 rank values not yet supplied)
   - `skillTier` - an integer, which can be decoded by [this lookup table](src/models/resources/skillTiers.js)
   - `winStreak` - number of matches the player has lost in a row, or 0 if the last match was a win (but sometimes this number and `lossStreak` are both zero, impossibly)
   - `wins` - an integer, number of games won
   - `xp` - an integer, number of experience points earned (in post-match rewards, for leveling the player's account)
- `.titleId` - always the string `"semc-vainglory"`
- `.skillTier` - an object containing both `serverName` and `name` properties, from the list in [this lookup table](src/models/resources/skillTiers.js)
- `.karmaLevel` - an object containing both `serverName` and `name` properties, from the list in [this lookup table](src/models/resources/karma.js)
- `.createdAt` - meaning unclear; this attribute is not always present
