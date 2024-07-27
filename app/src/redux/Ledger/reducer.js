const initialState = {
    ledgerState: 0,
    readAllLedger:{},
    createLedger:{},
    updateLedger:{},
    getLedgerById:{},
    getLedgerByReceipt:{},
    getLedgerByHotelId:{},
    deleteLedger:{},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

              case "GET_ALL_LEDGER_PENDING":
                return { ...state, ledgerState: 1 };
              case "GET_ALL_LEDGER_FULFILLED":
                return { ...state, ledgerState: 2, readAllLedger: action.payload.data };
              case "GET_ALL_LEDGER_REJECTED":
                return { ...state, ledgerState: 3 };

              case "GET_LEDGER_BY_ID_PENDING":
                return { ...state, ledgerState: 1 };
              case "GET_LEDGER_BY_ID_FULFILLED":
                return { ...state, ledgerState: 2, getLedgerById: action.payload.data };
              case "GET_LEDGER_BY_ID_REJECTED":
                return { ...state, ledgerState: 3 };

              case "GET_LEDGER_BY_RECEIPT_ID_PENDING":
                return { ...state, ledgerState: 1 };
              case "GET_LEDGER_BY_RECEIPT_ID_FULFILLED":
                return { ...state, ledgerState: 2, getLedgerByReceipt: action.payload.data };
              case "GET_LEDGER_BY_RECEIPT_ID_REJECTED":
                return { ...state, ledgerState: 3 };

              case "GET_LEDGER_BY_HOTEL_ID_PENDING":
                return { ...state, ledgerState: 1 };
              case "GET_LEDGER_BY_HOTEL_ID_FULFILLED":
                return { ...state, ledgerState: 2, getLedgerByHotelId: action.payload.data };
              case "GET_LEDGER_BY_HOTEL_ID_REJECTED":
                return { ...state, ledgerState: 3 };
      
                case "CREATE_LEDGER_PENDING":
                  return { ...state, ledgerState: 1 };
                case "CREATE_LEDGER_FULFILLED":
                  return { ...state, ledgerState: 2, createLedger: action.payload.data };
                case "CREATE_LEDGER_REJECTED":
                  return { ...state, ledgerState: 3 };

                  case "UPDATE_LEDGER_PENDING":
                    return { ...state, ledgerState: 1 };
                  case "UPDATE_LEDGER_FULFILLED":
                    return { ...state, ledgerState: 2, updateLedger: action.payload.data };
                  case "UPDATE_LEDGER_REJECTED":
                    return { ...state, ledgerState: 3 };

                case "DELETE_LEDGER_PENDING":
                  return { ...state, ledgerState: 1 };
                case "DELETE_LEDGER_FULFILLED":
                  return { ...state, ledgerState: 2, deleteLedger: action.payload.data };
                case "DELETE_LEDGER_REJECTED":
                  return { ...state, ledgerState: 3 };

        default:
            return state
    }
}

export default reducer