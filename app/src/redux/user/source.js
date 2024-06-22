import {request} from '../../../request';

export const loginUser = data => {
  console.log(data, 'auth inside source');
  return request.post('user/login', data);
};

