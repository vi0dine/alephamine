import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from "./User.types";

const INITIAL_STATE = {
  id: null,
  email: null,
  accessToken: null,
  refreshToken: null,
  role: null,
  loading: false,
};

const userReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
