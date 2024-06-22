import { loginUser,} from './source'
import * as source from "./source";
import { LOGOUT_USER } from './konstant';

import { LOGIN_USER } from './konstant'

export function login (data) {
    return {
        type: LOGIN_USER,
        payload: loginUser(data)
    }
}

export function setUser (user) {
    return function (dispatch) {
        dispatch({
            type: 'SET_USER',
            payload: user
        })
    }
}

export const logoutUser = () => {
    return {
      type: LOGOUT_USER,
    };
  };