import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  fetchUserFail,
  fetchUserSuccess,
  loginFail,
  loginSuccess,
  logoutUserFail,
  logoutUserSuccess,
  signUpFail,
  signUpSuccess,
  updateUserFail,
  updateUserSuccess,
} from "./User.actions";
import { FETCH_USER, LOGIN, LOGOUT, SIGN_UP, UPDATE_USER } from "./User.types";
import { ToastAndroid } from "react-native";
import { StackActions } from "@react-navigation/native";
import useAlert from "../../shared/hooks/useAlert";
import { err } from "react-native-svg/lib/typescript/xml";

export function* watchUserSaga() {
  // @ts-ignore
  yield takeLatest(LOGIN, loginUser);
  yield takeLatest(LOGOUT, logoutUser);
  // @ts-ignore
  yield takeLatest(SIGN_UP, signUpUser);
  yield takeLatest(UPDATE_USER, updateUser);
  yield takeLatest(FETCH_USER, fetchUser);
}

function* signUpUser(action: {
  email: string;
  password: string;
  token: string;
  navigation: any;
}) {
  try {
    const { data } = yield call(() =>
      axios.request({
        url: "/users",
        data: {
          user: {
            email: action.email,
            password: action.password,
            notifications_token: action.token,
          },
        },
        method: "POST",
      })
    );
    yield put(signUpSuccess(data.user));
    yield call(() => action.navigation.navigate("Main"));
  } catch (error) {
    yield put(signUpFail());
  }
}

function* loginUser(action: {
  email: string;
  password: string;
  navigation: any;
}) {
  try {
    const { data } = yield call(() =>
      axios.request({
        url: "/oauth/token",
        data: {
          email: action.email,
          password: action.password,
          grant_type: "password",
        },
        method: "POST",
      })
    );
    yield put(loginSuccess(data));
    yield call(() => action.navigation.navigate("Main"));
  } catch (error) {
    if (error?.response?.status === 401) {
      useAlert("Błędne dane logowania.");
    } else {
      useAlert("Nie udało się zalogować.");
    }
    yield put(loginFail());
  }
}

function* fetchUser(action: { id: string }) {
  try {
    const { data } = yield call(() =>
      axios.request({
        url: `/users/${action.id}`,
        method: "GET",
      })
    );
    yield put(fetchUserSuccess(data.user));
  } catch (error) {
    yield put(fetchUserFail());
  }
}

function* updateUser(action: { id: string; values: any }) {
  try {
    const { data } = yield call(() =>
      axios.request({
        url: `/users/${action.id}`,
        data: { ...action.values },
        method: "PATCH",
      })
    );
    yield put(updateUserSuccess(data.user));
    ToastAndroid.show("Zapisano.", ToastAndroid.SHORT);
  } catch (error) {
    yield put(updateUserFail());
  }
}

function* logoutUser(action) {
  try {
    yield logoutUserSuccess();
    yield call(() => {
      action?.navigation.dispatch(StackActions.replace("Login"));
    });
  } catch (e) {
    yield put(logoutUserFail());
  }
}
