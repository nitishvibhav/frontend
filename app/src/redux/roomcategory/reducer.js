const initialState = {
  roomCategoryState: 0,
  roomCategory: {},
  craeteRoomCategoryState: 0,
  updateState: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ROOMCATEGORY_PENDING':
      return {...state, roomCategoryState: 1};
    case 'GET_ROOMCATEGORY_FULFILLED':
      return {
        ...state,
        roomCategoryState: 2,
        roomCategory: action.payload.data,
      };
    case 'GET_ROOMCATEGORY_REJECTED':
      return {...state, roomCategoryState: 3};

    case 'POST_ROOMCATEGORY_PENDING':
      return {...state, craeteRoomCategoryState: 1};
    case 'POST_ROOMCATEGORY_FULFILLED':
      return {
        ...state,
        craeteRoomCategoryState: 2,
        roomCategory: action.payload.data,
      };
    case 'POST_ROOMCATEGORY_REJECTED':
      return {...state, craeteRoomCategoryState: 3};

    case 'UPDATE_ROOMCATEGORY_PENDING':
      return {...state, updateState: 1};
    case 'UPDATE_ROOMCATEGORY_FULLFILLED':
      return {
        ...state,
        updateState: 2,
        roomCategory: action.payload.data,
      };
    case 'UPDATE_ROOMCATEGORY_REJECTED':
      return {...state, updateState: 3};

    default:
      return state;
  }
};

export default reducer;
