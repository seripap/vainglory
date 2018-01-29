import BaseModel from './';
import items from './resources/items';
import skillTiers from './resources/skillTiers';
import karma from './resources/karma';

export default class Participant extends BaseModel {

  constructor(data) {
    super(data);
    this.relationships = [{
      type: 'player',
    }];
  }

  replaceItem(key, stats) {
    for (const property of Object.keys(stats[key])) {
      const normalizedName = items.find((item) => item.serverName === property);
      if (normalizedName) {
        stats[key][normalizedName.name] = stats[key][property];
        delete stats[key][property];
      }
    }

    return stats[key];
  }

  replaceItemArray(key, stats) {
      stats[key].forEach((element, index) => {
          const normalizedName = items.find((item) => item.serverName === element);
          if (normalizedName) {
              stats[key][index] = normalizedName.name;
          }
      });

      return stats.items;
  }

  get _actor() {
    return this.raw.attributes.actor;
  }

  get actor() {
    const { actor } = this.raw.attributes;

    const badServerNames = [
      { token: '*Hero009*', name: 'Krul' },
      { token: '*Hero010*', name: 'Skaarf'},
      { token: '*Sayoc*', name: 'Taka'},
      { token: '*Hero016*', name: 'Rona'}
    ];

    const match = badServerNames.filter((item) => item.token === actor);

    if (match.length > 0) {
      return match[0].name;
    }

    return actor.replace(/\*/g, '');
  }

  get _stats() {
    return this.raw.attributes.stats;
  }

  get stats() {
    const stats = this.raw.attributes.stats;
    stats.itemGrants = this.replaceItem('itemGrants', stats);
    stats.itemUses = this.replaceItem('itemUses', stats);
    stats.items = this.replaceItemArray('items', stats);

    const skillTier = skillTiers.find(tier => tier.serverName === stats.skillTier);
    const karmaLevel = karma.find(k => k.serverName === stats.karmaLevel);

    stats.skillTier = skillTier ? skillTier.name : stats.skillTier;
    stats.karmaLevel = karmaLevel ? karmaLevel.name : stats.karmaLevel;

    return stats;
  }

  set player(player) {
    this.participantPlayer = player;
    return this;
  }

  get player() {
    return this.participantPlayer;
  }

}
