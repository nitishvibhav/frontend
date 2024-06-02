import { combineReducers } from 'redux'
import loginReducer from './src/redux/user/reducer'
import roomReducer from './src/redux/rooms/reducer'
import bookingReducer from './src/redux/booking/reducer'


// import LandingPageReducer from "./LandingPage/Components/redux/reducer"

export default combineReducers({
    loginReducer,
    roomReducer,
    bookingReducer,
   
})
