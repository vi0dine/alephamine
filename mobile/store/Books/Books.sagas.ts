import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  fetchWatchedFail,
  fetchWatchedSuccess,
  watchBookFail,
  watchBookSuccess,
} from "./Books.actions";
import { FETCH_WATCHED, WATCH_BOOK } from "./Books.types";
import { ToastAndroid } from "react-native";

export function* watchBooksSaga() {
  // @ts-ignore
  yield takeLatest(WATCH_BOOK, watchBook);
  yield takeLatest(FETCH_WATCHED, fetchBooks);
}

function* watchBook(action: { title: String }) {
  try {
    yield call(() =>
      axios.request({
        url: "/books",
        data: {
          title: action.title,
        },
        method: "POST",
      })
    );
    yield put(watchBookSuccess());
    ToastAndroid.show("Dodano książkę do obserwowanych.", ToastAndroid.LONG);
  } catch (error) {
    yield put(watchBookFail());
  }
}

function* fetchBooks() {
  try {
    const { data } = yield call(() =>
      axios.request({
        url: "/books",
        method: "GET",
      })
    );
    yield put(fetchWatchedSuccess(data.books));
  } catch (error) {
    yield put(fetchWatchedFail());
  }
}
