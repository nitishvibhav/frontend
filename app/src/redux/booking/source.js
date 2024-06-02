import {request} from '../../../request';

export const getBooking = () => {
  return request.get('customer-booking');
};

export const postBooking = (req)=>{
    return request.post ('customer-booking', req)
}
