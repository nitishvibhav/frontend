const initialState = {
    roomState: 0,
    filterState: 0,
    createState: 0,
    deleteState:0,
    updateState:0,
    roomList:{},
    roomById:{},
    createRoom: {},
    roomByParam: {},
    updateRoom: {},
    deleteRoom:{},
    roomByHotelID:{}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

              case "GET_ALL_ROOMS_PENDING":
                return { ...state, roomState: 1 };
              case "GET_ALL_ROOMS_FULFILLED":
                return { ...state, roomState: 2, roomList: action.payload.data };
              case "GET_ALL_ROOMS_REJECTED":
                return { ...state, roomState: 3 };

              case "GET_ROOM_BY_ID_PENDING":
                return { ...state, roomState: 1 };
              case "GET_ROOM_BY_ID_FULFILLED":
                return { ...state, roomState: 2, roomById: action.payload.data };
              case "GET_ROOM_BY_ID_REJECTED":
                return { ...state, roomState: 3 };

              case "GET_ROOM_BY_PARAM_PENDING":
                return { ...state, filterState: 1 };
              case "GET_ROOM_BY_PARAM_FULFILLED":
                return { ...state, filterState: 2, roomByParam: action.payload.data };
              case "GET_ROOM_BY_PARAM_REJECTED":
                return { ...state, filterState: 3 };

              case "GET_ROOM_BY_HOTELID_PENDING":
                return { ...state, roomState: 1 };
              case "GET_ROOM_BY_HOTELID_FULFILLED":
                return { ...state, roomState: 2, roomByHotelID: action.payload.data };
              case "GET_ROOM_BY_HOTELID_REJECTED":
                return { ...state, roomState: 3 };
      
                case "CREATE_ROOM_PENDING":
                  return { ...state, createState: 1 };
                case "CREATE_ROOM_FULFILLED":
                  return { ...state, createState: 2, createRoom: action.payload.data };
                case "CREATE_ROOM_REJECTED":
                  return { ...state, createState: 3 };

                  case "UPDATE_ROOM_PENDING":
                    return { ...state, updateState: 1 };
                  case "UPDATE_ROOM_FULFILLED":
                    return { ...state, updateState: 2, updateRoom: action.payload.data };
                  case "UPDATE_ROOM_REJECTED":
                    return { ...state, updateState: 3 };

                case "DELETE_ROOM_PENDING":
                  return { ...state, deleteState: 1 };
                case "DELETE_ROOM_FULFILLED":
                  return { ...state, deleteState: 2, deleteRoom: action.payload.data };
                case "DELETE_ROOM_REJECTED":
                  return { ...state, deleteState: 3 };

        default:
            return state
    }
}

export default reducer