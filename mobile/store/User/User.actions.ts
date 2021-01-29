import {
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGN_UP,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCESS,
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
