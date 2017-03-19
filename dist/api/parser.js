'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _asset = require('../models/asset');

var _asset2 = _interopRequireDefault(_asset);

var _players = require('../models/players');

var _players2 = _interopRequireDefault(_players);

var _player = require('../models/player');

var _player2 = _interopRequireDefault(_player);

var _matches = require('../models/matches');

var _matches2 = _interopRequireDefault(_matches);

var _match = require('../models/match');

var _match2 = _interopRequireDefault(_match);

var _participant = require('../models/participant');

var _participant2 = _interopRequireDefault(_participant);

var _roster = require('../models/roster');

var _roster2 = _interopRequireDefault(_roster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var map = {
  asset: _asset2.default,
  players: _players2.default,
  player: _player2.default,
  matches: _matches2.default,
  match: _match2.default,
  participant: _participant2.default,
  roster: _roster2.default
};

function getModel(entityType) {
  var model = map[entityType];
  if (!model) {
    throw new Error('Could not figure out class mapping');
  }

  return model;
}

exports.default = function (entity, data) {

  if (data === null) {
    return data;
  }

  var parentData = data.data;
  var includedData = data.included;
  var BaseModel = getModel(entity);
  var dataModel = new BaseModel(parentData);

  function checkForRelations(model, parent) {
    var clone = model;
    if (!model.relationships || !parent) {
      return clone;
    }

    if (model.relationships && model.relationships.length > 0) {
      model.relationships.forEach(function (item) {
        if ((0, _isArray2.default)(parent)) {
          clone[item.type] = parent.map(function (child) {
            var ChildModel = getModel(child.type);
            var childModel = new ChildModel(child);
            return checkForRelations(childModel, child);
          });
        } else {
          var relations = parent.relationships[item.type] ? parent.relationships[item.type].data : false;
          if (relations) {
            clone[item.type] = (0, _isArray2.default)(relations) ? relations.map(function (relation) {
              return filterRelations(relation);
            }) : filterRelations(relations);
          }
        }
      });
    }
    return clone;
  }

  // Filters models so they are formatted correctly.
  function filterRelations(relation) {
    var mappedData = includedData.find(function (inc) {
      return inc.id === relation.id;
    });
    var RelationModel = getModel(relation.type);
    var modeledData = new RelationModel(mappedData);

    return checkForRelations(modeledData, modeledData.data);
  }

  return checkForRelations(dataModel, parentData);
};