import { loginUser,} from './source'
import * as source from "./source";

import { LOGIN_USER } from './konstant'

export function login (auth) {
    return {
        type: LOGIN_USER,
        payload: loginUser(auth)
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
export function signUp(body) {
    console.log(body, "body");
    return {
      type: "SIGN_UP",
      payload: source.signUp(body),
    };
  }

export function googleLoginRequest(data) {
    console.log(data, "body");
    return {
      type: "SIGN_IN_WITH_GOOGLE",
      payload: source.googleLoginRequest(data),
    };
  }