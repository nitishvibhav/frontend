import { combineReducers } from 'redux'
import loginReducer from './src/redux/user/reducer'
import roomReducer from './src/redux/room/reducer'
import bookingReducer from './src/redux/booking/reducer'
import roomCategoryReducer from './src/redux/roomcategory/reducer'
import amenitiesReducer from './src/redux/amenities/reducer'
import amenitiesCategoryReducer from './src/redux/amenitiesCategory/reducer'
import filterationReducer from './src/redux/filteration/reducer'
import booking1Reducer from './src/redux/Booking1/reducer'
import ledgerReducer from './src/redux/Ledger/reducer'
import documentReducer from './src/redux/documents/reducer'

// import LandingPageReducer from "./LandingPage/Components/redux/reducer"

export default combineReducers({
    loginReducer,
    roomReducer,
    bookingReducer,
    roomCategoryReducer,
    amenitiesReducer,
    amenitiesCategoryReducer,
    filterationReducer,
    booking1Reducer,
    ledgerReducer,
    documentReducer,
})
