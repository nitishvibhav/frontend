import {request} from '../../../request';

export const loginUser = auth => {
  console.log(auth, 'auth inside source');
  return request.post('user/login', auth);
};
export const signUp = body => {
  console.log(body, 'show body');
  return request.post('user/signup', body);
};

export const googleLoginRequest = data => {
  console.log(data, 'This is data from source');
  return request.post('auth/google', data);
};
