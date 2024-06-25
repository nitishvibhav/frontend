import {LOGIN_USER, LOGOUT_USER} from './konstant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUser} from '../../../utils';
const initialState = {
  user: {},
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
      AsyncStorage.setItem('result', JSON.stringify(user));
      return {...state, loginState: 2, user};
    case `${LOGIN_USER}_REJECTED`:
      return {
        ...state,
        loginState: 3,
        loginError: action.payload.response.data,
      };

    case LOGOUT_USER:
      console.log('LOGOUT_USER action dispatched');
      AsyncStorage.removeItem('result')
        .then(() => console.log('result removed from AsyncStorage'))
        .catch(error =>
          console.error('Error removing result from AsyncStorage:', error),
        );
      return {...state, user: null};
    default:
      return state;
  }
};

export default reducer;
