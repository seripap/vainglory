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
  
  get createdAt() {
    return this.data.attributes.createdAt;
  }

  get skillTier() {
    const stats = this.raw.attributes.stats;
    return skillTiers.find(tier => tier.serverName === stats.skillTier) || null;
  }

  get karmaLevel() {
    const stats = this.raw.attributes.stats;
    return karma.find(tier => tier.serverName === stats.karmaLevel) || null;
  }

  get stats() {
    return this.raw.attributes.stats;
  }

  get titleId() {
    return this.data.attributes.titleId;
  }

}
