import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import parser from '../parser';
import { normalizeError } from '../../Errors';
import { encodePlayerNames } from '../../Utils';
import matches from '../matches';
import players from '../players';

const REGION_PREFIX = 'tournament';

export default (http) => {

  function region(REQUESTED_REGION = false) {
    let REGION_TO_REQUEST = null;
    if (!REQUESTED_REGION) {
      REGION_TO_REQUEST = http.region;
    } else {
      REGION_TO_REQUEST = REQUESTED_REGION;
    }

    http.tempRegion = `${REGION_PREFIX}-${REGION_TO_REQUEST}`;
    return {
      matches: matches(http),
      players: players(http),
    }
  }

  return {
    region,
  };

};
