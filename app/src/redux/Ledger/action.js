import * as source from "./source";

export const getAllLedger = () => {
    return{
        type: "GET_ALL_LEDGER",
        payload: source.getAllLedger(),
    };
};

export const createLedger = (req) => {
    return{
        type: "CREATE_LEDGER",
        payload: source.createLedger(req),
    };
};

export const getByIdLedger = (id) =>{
    return{
        type: "GET_LEDGER_BY_ID",
        payload: source.getByIdLedger(id),
    };
};

export const getByReceiptIdLedger = (id) =>{
    return{
        type: "GET_LEDGER_BY_RECEIPT_ID",
        payload: source.getByReceiptIdLedger(id),
    };
};

export const getByHotelIdLedger = (id) =>{
    return{
        type: "GET_LEDGER_BY_HOTEL_ID",
        payload: source.getByHotelIdLedger(id),
    };
};

export const updateLedger = (body, id) => {
    return{
        type: "UPDATE_LEDGER",
        payload: source.updateLedger(body, id),
    };
};

export const deleteLedger = (id) => {
    return{
        type: "DELETE_LEDGER",
        payload: source.deleteLedger(id),
    };
};


