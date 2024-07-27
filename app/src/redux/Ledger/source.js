import {request} from "../../../request";

export const getAllLedger = () =>{
    return request.get(`ledger`);
};

export const createLedger = (req) => {
    return request.post(`ledger`, req);
};

export const getByIdLedger= (id) => {
    return request.get(`ledger/${id}`)
}

export const getByHotelIdLedger= (id) => {
    return request.get(`ledger/hotel/${id}`)
}

export const getByReceiptIdLedger= (id) => {
    return request.get(`ledger/receipt/${id}`)
}

export const updateLedger = (body, id) => {
    return request.patch(`ledger/${id}`, body)
}

export const deleteLedger = (id) => {
    return request.delete(`ledger/${id}`)
}