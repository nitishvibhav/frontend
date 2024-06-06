import * as source from './source';

export function getRoomCategoryDetails() {
  return {
    type: 'GET_ROOMCATEGORY',
    payload: source.getRoomCategory(),
  };
}

export function postRoomCategory (data) {
  return {
    type: 'POST_ROOMCATEGORY',
    payload: source.postRoomCategoryDetails(data),
  };
};

export function updateRoomCategory (data, id) {
  return {
    type: 'UPDATE_ROOMCATEGORY',
    payload: source.updateRoomCategory(data,id),
  };
};

