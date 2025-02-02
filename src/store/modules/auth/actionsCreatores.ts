import * as actionsTypes from './actionsTypes';

export function loginRequest(payload: IsLoggedIn) {
  const action: LoginAction = {
    type: actionsTypes.LOGIN_REQUEST,
    payload,
  };
  return action;
}

export function loginSuccess(isLoggedIn: IsLoggedIn) {
  const action: LoginAction = {
    type: actionsTypes.LOGIN_SUCCESS,
    payload: isLoggedIn,
  };
  return action;
}

export function loginFailure(error: string) {
  const action: LoginAction = {
    type: actionsTypes.LOGIN_FAILURE,
    payload: error,
  };
  return action;
}
