const initialState = {
  bookingState: 0,
  booking: {},
  createState: 0,

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOOKING_PENDING':
      return {...state, bookingState: 1};
    case 'GET_BOOKING_FULFILLED':
      return {...state, bookingState: 2, booking: action.payload.data};
    case 'GET_BOOKING_REJECTED':
      return {...state, bookingState: 3};

    case 'POST_BOOKING_PENDING':
      return {...state, createState: 1};
    case 'POST_BOOKING_FULFILLED':
      return {...state, createState: 2, booking: action.payload.data};
    case 'POST_BOOKING_REJECTED':
      return {...state, createState: 3};

    default:
      return state;
  }
};

export default reducer;
