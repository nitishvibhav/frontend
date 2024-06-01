const initialState = {
  roomsState: 0,
  rooms: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ROOMS_PENDING':
      return {...state, roomsState: 1};
    case 'GET_ROOMS_FULFILLED':
      return {...state, roomsState: 2, rooms: action.payload.data};
    case 'GET_ROOMS_REJECTED':
      return {...state, roomsState: 3};

    default:
      return state;
  }
};

export default reducer;
