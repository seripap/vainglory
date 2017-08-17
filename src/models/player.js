import BaseModel from './';
import skillTiers from './resources/skillTiers';
import karma from './resources/karma';

export default class Player extends BaseModel {

  constructor(data) {
    super(data);
  }

  get name() {
    return this.data.attributes.name;
  }

  get shardId() {
    return this.data.attributes.shardId;
  }

  get stats() {
    const stats = this.raw.attributes.stats;
    stats.skillTier = skillTiers.find(tier => tier.serverName === stats.skillTier).name || stats.skillTier;
    stats.karmaLevel = karma.find(k => k.serverName === stats.karmaLevel).name || stats.karmaLevel;

    return stats;
  }

  get titleId() {
    return this.data.attributes.titleId;
  }

}
