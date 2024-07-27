import {request} from "../../../request";

export const getAllBooking = () =>{
    return request.get(`customer-booking`);
};

export const createBooking = (req) => {
    return request.post(`customer-booking`, req);
};

export const getByIdBooking= (id) => {
    return request.get(`customer-booking/${id}`)
}

export const getByHotelIdBooking= (id) => {
    return request.get(`customer-booking/hotel/${id}`)
}

export const updateBooking = (body, id) => {
    return request.patch(`customer-booking/${id}`, body)
}

export const deleteBooking = (id) => {
    return request.delete(`customer-booking/${id}`)
}