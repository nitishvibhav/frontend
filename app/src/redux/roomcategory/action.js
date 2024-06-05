import * as source from './source';

export function getRoomCategoryDetails() {
  return {
    type: 'GET_ROOMCATEGORY',
    payload: source.getRoomCategory(),
  };
}
