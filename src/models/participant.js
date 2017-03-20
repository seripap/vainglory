import BaseModel from './';
import actors from './resources/actors';
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

  get _actor() {
    return this.raw.attributes.actor;
  }

  get actor() {
    const normalizedActor = actors.find(actor => actor.serverName === this.raw.attributes.actor);
    return normalizedActor ? normalizedActor.name : this.raw.attributes.actor;
  }

  get _stats() {
    return this.raw.attributes.stats;
  }

  get stats() {
    const stats = this.raw.attributes.stats;
    stats.itemGrants = this.replaceItem('itemGrants', stats);
    stats.itemUses = this.replaceItem('itemUses', stats);
    stats.items = this.replaceItem('items', stats);
    stats.skillTier = skillTiers.find(tier => tier.serverName === stats.skillTier).name || stats.skillTier;
    stats.karmaLevel = karma.find(k => k.serverName === stats.karmaLevel).name || stats.karmaLevel;
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
