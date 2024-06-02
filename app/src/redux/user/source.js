import {request} from '../../../request';

export const loginUser = auth => {
  console.log(auth, 'auth inside source');
  return request.post('user/login', auth);
};

