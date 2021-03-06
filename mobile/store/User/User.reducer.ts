import {
  FETCH_USER,
  FETCH_USER_FAIL,
  FETCH_USER_SUCCESS,
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
} from "./User.types";

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
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
      };
    case SIGN_UP_SUCCESS:
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
    case SIGN_UP_FAIL:
      return {
        ...state,
        loading: false,
      };
    case FETCH_USER:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        ...action.user,
        loading: false,
      };
    case FETCH_USER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        ...action.user,
        loading: false,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
