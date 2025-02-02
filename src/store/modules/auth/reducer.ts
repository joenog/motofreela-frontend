import * as actionsTypes from './actionsTypes';

const initialState: LoginState = {
  isLoggedin: {
    isLoggedIn: false,
  },
  error: null,
  loading: false,
};

const reducer = (
  state: LoginState = initialState,
  action: LoginAction,
): LoginState => {
  switch (action.type) {
    case actionsTypes.LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case actionsTypes.LOGIN_FAILURE: {
      return {
        isLoggedin: {
          isLoggedIn: false,
          user: {
            id: 0,
            name: '',
            email: '',
            business: false,
          },
        },
        loading: false,
        error: action.payload as string,
      };
    }

    case actionsTypes.LOGIN_SUCCESS: {
      console.log('Reducer', action.payload);
      return {
        ...state,
        loading: false,
        isLoggedin: action.payload as IsLoggedIn,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
