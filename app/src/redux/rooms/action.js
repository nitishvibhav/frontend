import * as source from './source';

export function getRoomsDetails() {
  return {
    type: 'GET_ROOMS',
    payload: source.getRooms(),
  };
}
