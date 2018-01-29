# Changelog

See [latest releases](https://github.com/seripap/vainglory/releases) for raw downloads. You can also specify specific versions via npm `npm install vainglory@v0.0.0`.

Changelog is organized as so: VERSION NUMBER - OPTIONAL TITLE - RELEASE DATE

---

## v1.3.7 - Support for Vainglory 2.12 - 01.29.2018
- Add `serverName` parsing for 5v5 (#29 via @PierreAndreis)

## v1.3.6 - Support for Vainglory 2.11 - 12.05.2017
- Add support for Onslaught matches (#27 va @PierreAndreis)

## v1.3.5 - Fixed v1.3.4 regression issue, add mappings to new items - 11.12.2017
- Fixed `.actor` returning an error, introduced in v1.3.4. Sorry about that
- Add item mappings for Spellsword, Spellfire, Healing Flask

## v1.3.4 - Future proofing + Support for Vainglory Patch v2.10 - 11.12.2017
- Added support for `.skillTier` and `.karmaLevel` for *Player* (via #25 @PierreAndreis) 
- Added support for all new actors going forward (via #26 @PierreAndreis) 
- Added [CHANGELOG](https://github.com/seripap/vainglory/blob/master/CHANGELOG.md)

## v1.3.3 - Support for Vainglory Patch v2.9 - 10.11.2017
- Add Churnwalker as a resource
- Support for createdAt inside Player object (via @PierreAndreis #22) 

## v1.3.2 - Options Consistency - 10.04.2017
- Changed default createdAt-start from 3 hours to 28 days to stay in-line with VG API Specs
- Merging entire response with errors object versus res.status

## v1.3.1 - Additional Support for v2.7 - 08.08.2017
- Added Reza as resource

## v1.3.0 - Typo, new resource - 06.22.2017
- Adds Grace as resource

### Fixes
- Battle Royal --> Battle Royale (ef542b8d7c6a7687599f3288a78e917ca402c1c8)


## v1.1.0 - Un-betatized, Add Baptiste as Resource - 04.29.2017
- Updated to minor version as I broke the versioning scheme 
- Moving client out of beta as it's fairly stable at this point 🥇 
- Add Baptiste as model resource

## v1.0.2 - Normalized more data fields - 03.20.2017
- Added `._gameMode` on Match for raw data
- `.gameMode` now returns a named [game mode](https://github.com/seripap/vainglory/blob/master/src/models/resources/gameModes.js)
- Participant skill tiers now returns a named [skill tier](https://github.com/seripap/vainglory/blob/master/src/models/resources/skillTiers.js)
- Participant karma level now returns a named [karma level](https://github.com/seripap/vainglory/blob/master/src/models/resources/karma.js)

## v1.0.1 - Resolving telemetry data - 03.20.2017
- Added .resolve() to telemetry asset

## v1.0.0 - Telemetry Support - 03.19.2017
- Added support for `asset` model for telemetry data (sub model of `match`) [Docs](https://github.com/seripap/vainglory#telemetry)

## v0.9.9 - 03.17.2017
- Added support for "new" names

```
    "Taka":   "*Taka*",
    "Krul": "*Krul*",
    "Skaarf": "*Skaarf*",
```

## v0.9.8 - 03.13.2017
- Added `.rateLimit` information to requests

### Fixed
- Added support for playerNames endpoint change; getByName now supports multiplayer name lookups - [players.getByName now requires an array](https://github.com/seripap/vainglory#playersName)
- playerNames will now be encoded correctly when making requests
- Item names are now sanitized correctly (#6)

## v0.9.6 - Exposing data models - 03.05.2017
- Exposing data models for development using sample data.
- Added Grumpjaw actor

## v0.9.5 - Debugging Errors - 03.01.2017
- Added `.debug` key to error responses.

``` javascript
vainglory.players.getById(playerId).then((player) => {
  if (player.errors) {
    // see inside request options
    return console.log(player.debug);
  };
  console.log(player.id);
  console.log(player.stats);
}).catch((errorMsg) => {
  console.error(errorMsg);
});
```

## v0.9.4 - Dynamic Regions - 03.01.2017
- Added support to change region

``` javascript
vainglory.setRegion('region-id');
```

## v0.9.0 - 02.28.2017
Final pre-release.

- Improved error handling and messaging
- Normalized data responses with `errors` key
- Tests are back
  - Coverage needs improvement

## v0.7.4 - 02.27.2017
- Added support to change regions

```
// Defaults to na
const vg = new Vainglory('api-key', { region: 'sg' })
```

## v0.6.2 - 02.26.2017
- Moved polyfill entrypoint to index.js
- Some initial work of error handling / messaging
