import { combineReducers } from 'redux'
import loginReducer from './src/redux/user/reducer'
import roomReducer from './src/redux/rooms/reducer'
import bookingReducer from './src/redux/booking/reducer'
import roomCategoryReducer from './src/redux/roomcategory/reducer'
import amenitiesReducer from './src/redux/amenities/reducer'
import amenitiesCategoryReducer from './src/redux/amenitiesCategory/reducer'

// import LandingPageReducer from "./LandingPage/Components/redux/reducer"

export default combineReducers({
    loginReducer,
    roomReducer,
    bookingReducer,
    roomCategoryReducer,
    amenitiesReducer,
    amenitiesCategoryReducer,
})
