import BaseModel from './';
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
      const itemRegex = /^(.*)_(.*?)\*/gm;
      const itemNameParts = itemRegex.exec(property);

      // Items are referenced as *XX_Item_ItemName* whereas ItemName will be in the 3rd group of the regex
      if (itemNameParts.length === 3) {
        const realName = itemNameParts[2].trim();
        stats[key][realName] = stats[key][property];
        delete stats[key][property];
      }
    }
    return stats[key];
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
    stats.itemSells = this.replaceItem('itemSells', stats);

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
