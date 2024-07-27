import * as source from "./source";

export const getAllBooking = () => {
    return{
        type: "GET_ALL_BOOKING",
        payload: source.getAllBooking(),
    };
};

export const createBooking = (req) => {
    return{
        type: "CREATE_BOOKING",
        payload: source.createBooking(req),
    };
};

export const getByIdBooking = (id) =>{
    return{
        type: "GET_BOOKING_BY_ID",
        payload: source.getByIdBooking(id),
    };
};

export const getByHotelIdBooking = (id) =>{
    return{
        type: "GET_BOOKING_BY_HOTELID",
        payload: source.getByHotelIdBooking(id),
    };
};

export const updateBooking = (body, id) => {
    return{
        type: "UPDATE_BOOKING",
        payload: source.updateBooking(body, id),
    };
};

export const deleteBooking = (id) => {
    return{
        type: "DELETE_BOOKING",
        payload: source.deleteBooking(id),
    };
};


