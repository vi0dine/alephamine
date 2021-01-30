import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  loginFail,
  loginSuccess,
  signUpFail,
  signUpSuccess,
} from "./User.actions";
import { LOGIN, SIGN_UP } from "./User.types";

export function* watchUserSaga() {
  // @ts-ignore
  yield takeLatest(LOGIN, loginUser);
  // @ts-ignore
  yield takeLatest(SIGN_UP, signUpUser);
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

// function* logoutUser(action) {
//     try {
//         yield call(() => axios.request({
//             url: `/sign_out`,
//             method: 'DELETE'
//         }));
//         yield call(() => axios.request({
//             url: `/oauth/revoke`,
//             data: {
//                 token: store.getState().UserState.accessToken
//             },
//             method: 'POST'
//         }));
//         yield put(logoutUserSuccess());
//         yield call(() => action.navigation.navigate('Login'))
//     } catch (error) {
//         yield put(logoutUserFail(error))
//     }
// }
