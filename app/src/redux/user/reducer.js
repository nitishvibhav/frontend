import {LOGIN_USER} from './konstant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUser} from '../../../utils';
const initialState = {
  user: [],
  createState: 0,
  loginState: 0,
  addState: 0,
  loginError: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {...state, user: action.payload};

    case `${LOGIN_USER}_PENDING`:
      return {...state, loginState: 1};
    case `${LOGIN_USER}_FULFILLED`:
      const user = action.payload.data;
      setUser(user);
      AsyncStorage.setItem('result', JSON.stringify(user))
      return {...state, loginState: 2, user};
    case `${LOGIN_USER}_REJECTED`:
      return {
        ...state,
        loginState: 3,
        loginError: action.payload.response.data,
      };

    default:
      return state;
  }
};

export default reducer;
                  