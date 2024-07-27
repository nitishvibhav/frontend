const initialState = {
    bookingState: 0,
    readAllBooking:{},
    createBooking:{},
    updateBooking:{},
    getBookingById:{},
    getBookingByHotelId:{},
    deleteBooking:{},
    
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

              case "GET_ALL_BOOKING_PENDING":
                return { ...state, bookingState: 1 };
              case "GET_ALL_BOOKING_FULFILLED":
                return { ...state, bookingState: 2, readAllBooking: action.payload.data };
              case "GET_ALL_BOOKING_REJECTED":
                return { ...state, bookingState: 3 };

              case "GET_BOOKING_BY_ID_PENDING":
                return { ...state, bookingState: 1 };
              case "GET_BOOKING_BY_ID_FULFILLED":
                return { ...state, bookingState: 2, getBookingById: action.payload.data };
              case "GET_BOOKING_BY_ID_REJECTED":
                return { ...state, bookingState: 3 };

              case "GET_BOOKING_BY_HOTELID_PENDING":
                return { ...state, bookingState: 1 };
              case "GET_BOOKING_BY_HOTELID_FULFILLED":
                return { ...state, bookingState: 2, getBookingByHotelId: action.payload.data };
              case "GET_BOOKING_BY_HOTELID_REJECTED":
                return { ...state, bookingState: 3 };
      
                case "CREATE_BOOKING_PENDING":
                  return { ...state, bookingState: 1 };
                case "CREATE_BOOKING_FULFILLED":
                  return { ...state, bookingState: 2, createBooking: action.payload.data };
                case "CREATE_BOOKING_REJECTED":
                  return { ...state, bookingState: 3 };

                  case "UPDATE_BOOKING_PENDING":
                    return { ...state, bookingState: 1 };
                  case "UPDATE_BOOKING_FULFILLED":
                    return { ...state, bookingState: 2, updateBooking: action.payload.data };
                  case "UPDATE_BOOKING_REJECTED":
                    return { ...state, bookingState: 3 };

                case "DELETE_BOOKING_PENDING":
                  return { ...state, bookingState: 1 };
                case "DELETE_BOOKING_FULFILLED":
                  return { ...state, bookingState: 2, deleteBooking: action.payload.data };
                case "DELETE_BOOKING_REJECTED":
                  return { ...state, bookingState: 3 };

        default:
            return state
    }
}

export default reducer