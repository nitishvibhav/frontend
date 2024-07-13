import { request } from '../../../request';

export const postFilteration = (data) => {
  console.log(data, "data")
  return request.post('filteration/rbdbc', data);
  
};
