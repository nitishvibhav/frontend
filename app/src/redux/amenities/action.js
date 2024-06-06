import * as source from './source';

export function getAminitiesDetails() {
  return {
    type: 'GET_AMENITIES',
    payload: source.getAminities(),
  };
}

