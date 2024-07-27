import {request} from "../../../request";

//get all rooms
export const getAllRooms = () =>{
    return request.get(`rooms`);
};

//create room room
export const createRooms = (req) => {
    return request.post(`rooms`, req);
};

// get room by id
export const getRoomById = (id) => {
    return request.get(`rooms/${id}`)
}
// get room by parameter
export const getRoomByParam = (req) => {
    return request.post(`filteration/rbdbc`, req)
}

// get room by hotelid
export const getRoomByHotelID = (id) => {
    return request.get(`rooms/user/${id}`)
}

// update room room
export const updateRoom = (body, id) => {
    return request.patch(`rooms/${id}`, body)
}

//delete room
export const deleteRoom = (id) => {
    return request.delete(`rooms/${id}`)
}