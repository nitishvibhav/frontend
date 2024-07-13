import {request} from '../../../request';

export const getRooms = () => {
  return request.get('rooms');
};

