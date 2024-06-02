import * as source from './source';

export function getBookingDetails() {
  return {
    type: 'GET_BOOKING',
    payload: source.getBooking(),
  };
}

export const postBooking = (req) => {
  return {
    type: 'POST_BOOKING',
    payload: source.postBooking(req),
  };
};
