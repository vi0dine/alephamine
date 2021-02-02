import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  fetchUserFail,
  fetchUserSuccess,
  loginFail,
  loginSuccess,
  signUpFail,
  signUpSuccess,
  updateUserFail,
  updateUserSuccess,
} from "./User.actions";
import { FETCH_USER, LOGIN, SIGN_UP, UPDATE_USER } from "./User.types";
import { ToastAndroid } from "react-native";

export function* watchUserSaga() {
  // @ts-ignore
  yield takeLatest(LOGIN, loginUser);
  // @ts-ignore
  yield takeLatest(SIGN_UP, signUpUser);
  yield takeLatest(UPDATE_USER, updateUser);
  yield takeLatest(FETCH_USER, fetchUser);
}

function* signUpUser(action: {
  email: String;
  password: String;
  token: String;
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
  email: String;
  password: String;
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
    yield put(loginFail());
  }
}

function* fetchUser(action: { id: String }) {
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

function* updateUser(action: { id: String; values: any }) {
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
