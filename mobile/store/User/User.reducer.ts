import { LOGIN, LOGIN_SUCCESS } from "./User.types";

const INITIAL_STATE = {
  id: null,
  email: null,
  role: null,
  accountType: null,
  accessToken: null,
  refreshToken: null,
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
        id: action.id,
        email: action.email,
        role: action.role,
        accountType: action.accountType,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        loading: false,
      };
    default:
      return { ...state };
  }
};

export default userReducer;
