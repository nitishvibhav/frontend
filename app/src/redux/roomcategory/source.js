import {request} from '../../../request';

export const getRoomCategory = () => {
  return request.get('rooms-category');
};


export const postRoomCategoryDetails = data => {
  return request.post('rooms-category', data);
};

export const updateRoomCategory = (id, data) => {
  return request.patch(`rooms-category/${id}`, data);
};
