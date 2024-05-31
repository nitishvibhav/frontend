import { LOGIN_USER } from './konstant'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUser} from '../../../utils'
const initialState = {
    user: {},
    createState:0,
    loginState: 0,
    addState: 0,
    loginError: {},
    googleUser: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload }

            case `${LOGIN_USER}_PENDING`:
            return { ...state, loginState: 1 }
            case `${LOGIN_USER}_FULFILLED`:
            const user = action.payload.data
            setUser(user);
            AsyncStorage.setItem('user', JSON.stringify(user))
            AsyncStorage.setItem("token", user.token);
            return { ...state, loginState: 2, user }
            case `${LOGIN_USER}_REJECTED`:
            return { ...state, loginState: 3, loginError: action.payload.response.data }
            console.log(action.payload, "action.payload")


            case `SIGN_IN_WITH_GOOGLE_PENDING`:
            return { ...state, loginState: 1 }
            case `SIGN_IN_WITH_GOOGLE_FULFILLED`:
            const googleuser = action.payload.data
            setUser(googleuser);
            AsyncStorage.setItem("token", googleuser.token);
            return { ...state, loginState: 2, googleuser }
            case `SIGN_IN_WITH_GOOGLE_REJECTED`:
            return { ...state, loginState: 3, loginError: action.payload.response.data }


            case "SIGN_UP_PENDING":
                return { ...state, loginState: 1 };
              case "SIGN_UP_FULFILLED":
                return { ...state, loginState: 2, user: action.payload.data };
              case "SIGN_UP_REJECTED":
                return { ...state, loginState: 3 };


        default:
            return state
    }
}

export default reducer
