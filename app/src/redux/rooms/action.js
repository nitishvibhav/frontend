import * as source from './source';

export function getRooms() {
  return {
    type: 'GET_ROOMS',
    payload: source.getRooms(),
  };
}
