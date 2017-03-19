import isArray from 'lodash/isArray';
import util from 'util';

import Asset from '../models/asset';
import Players from '../models/players';
import Player from '../models/player';
import Matches from '../models/matches';
import Match from '../models/match';
import Participant from '../models/participant';
import Roster from '../models/roster';

const map = {
  asset: Asset,
  players: Players,
  player: Player,
  matches: Matches,
  match: Match,
  participant: Participant,
  roster: Roster,
};

function getModel(entityType) {
  const model = map[entityType];
  if (!model) {
    throw new Error('Could not figure out class mapping');
  }

  return model;
}

export default (entity, data) => {

  if (data === null) {
    return data;
  }

  const parentData = data.data;
  const includedData = data.included;
  const BaseModel = getModel(entity);
  const dataModel = new BaseModel(parentData);

  function checkForRelations(model, parent) {
    const clone = model;
    if (!model.relationships || !parent) {
      return clone;
    }

    if (model.relationships && model.relationships.length > 0) {
      model.relationships.forEach((item) => {
        if (isArray(parent)) {
          clone[item.type] = parent.map(child => {
            const ChildModel = getModel(child.type);
            const childModel = new ChildModel(child);
            return checkForRelations(childModel, child);
          });
        } else {
          const relations = parent.relationships[item.type] ? parent.relationships[item.type].data : false;
          if (relations) {
            clone[item.type] = isArray(relations) ? relations.map(relation => filterRelations(relation)) : filterRelations(relations);
          }
        }
      });
    }
    return clone;
  }

  // Filters models so they are formatted correctly.
  function filterRelations(relation) {
    const mappedData = includedData.find(inc => inc.id === relation.id);
    const RelationModel = getModel(relation.type);
    const modeledData = new RelationModel(mappedData);

    return checkForRelations(modeledData, modeledData.data);
  }


  return checkForRelations(dataModel, parentData);

};
