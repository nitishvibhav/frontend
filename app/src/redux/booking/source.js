import {request} from '../../../request';

export const getBooking = () => {
  return request.get('customer-booking');
};

export const postBooking = (req)=>{
    return request.post ('customer-booking', req)
}

export const deleteBooking = (id, row) => {
  return request.delete(`customer-booking/${id}`, row);
};
