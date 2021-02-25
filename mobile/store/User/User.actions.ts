import {
  FETCH_USER,
  FETCH_USER_FAIL,
  FETCH_USER_SUCCESS,
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  SIGN_UP,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
} from "./User.types";

export const loginUser = (email: String, password: String, navigation: any) => {
  return {
    type: LOGIN,
    email,
    password,
    navigation,
  };
};

type AuthResponse = {
  id: String;
  email: String;
  role: String;
  account_type: String;
  access_token: String;
  refresh_token: String;
};

export const loginSuccess = (authResponse: AuthResponse) => {
  return {
    type: LOGIN_SUCCESS,
    id: authResponse.id,
    email: authResponse.email,
    role: authResponse.role,
    accountType: authResponse.account_type,
    accessToken: authResponse.access_token,
    refreshToken: authResponse.refresh_token,
  };
};

export const loginFail = () => {
  return {
    type: LOGIN_FAIL,
  };
};

export const signUpUser = (
  email: String,
  password: String,
  token: String,
  navigation: any
) => {
  return {
    type: SIGN_UP,
    email,
    password,
    token,
    navigation,
  };
};

export const signUpSuccess = (authResponse: AuthResponse) => {
  return {
    type: SIGN_UP_SUCCESS,
    id: authResponse.id,
    email: authResponse.email,
    role: authResponse.role,
    accountType: authResponse.account_type,
    accessToken: authResponse.access_token,
    refreshToken: authResponse.refresh_token,
  };
};

export const signUpFail = () => {
  return {
    type: SIGN_UP_FAIL,
  };
};

export const fetchUser = (id) => {
  return {
    type: FETCH_USER,
    id,
  };
};

export const fetchUserSuccess = (user) => {
  return {
    type: FETCH_USER_SUCCESS,
    user,
  };
};

export const fetchUserFail = () => {
  return {
    type: FETCH_USER_FAIL,
  };
};

export const updateUser = (id, values) => {
  return {
    type: UPDATE_USER,
    id,
    values,
  };
};

export const updateUserSuccess = (user) => {
  return {
    type: UPDATE_USER_SUCCESS,
    user,
  };
};

export const updateUserFail = () => {
  return {
    type: UPDATE_USER_FAIL,
  };
};

export const logoutUser = (navigation) => {
  return {
    type: LOGOUT,
    navigation,
  };
};

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const logoutUserFail = () => {
  return {
    type: LOGOUT_FAIL,
  };
};
