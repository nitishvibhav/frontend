import {request} from '../../../request';

export const getRoomCategory = () => {
  return request.get('rooms-category');
};
