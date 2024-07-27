import * as source from "./source";

//get all rooms
export const getAllRooms = () => {
    return{
        type: "GET_ALL_ROOMS",
        payload: source.getAllRooms(),
    };
};


//create room
export const createRooms = (req) => {
    return{
        type: "CREATE_ROOM",
        payload: source.createRooms(req),
    };
};

//get Room by param
export const getRoomByParam = (req) => {
    return{
        type: "GET_ROOM_BY_PARAM",
        payload: source.getRoomByParam(req),
    };
};

// get room by id
export const getRoomById = (id) =>{
    return{
        type: "GET_ROOM_BY_ID",
        payload: source.getRoomById(id),
    };
};
// get room by hotelId
export const getRoomByHotelID = (id) =>{
    return{
        type: "GET_ROOM_BY_HOTELID",
        payload: source.getRoomByHotelID(id),
    };
};

//update room
export const updateRoom = (body, id) => {
    return{
        type: "UPDATE_ROOM",
        payload: source.updateRoom(body, id),
    };
};

//delete room
export const deleteRoom = (id) => {
    return{
        type: "DELETE_ROOM",
        payload: source.deleteRoom(id),
    };
};


