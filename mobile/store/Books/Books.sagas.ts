import { takeLatest, takeEvery, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  dismissBookFail,
  dismissBookSuccess,
  fetchDismissedSuccess,
  fetchWatchedFail,
  fetchWatchedSuccess,
  restoreBookFail,
  restoreBookSuccess,
  watchBookFail,
  watchBookSuccess,
} from "./Books.actions";
import {
  DISMISS_BOOK,
  FETCH_WATCHED,
  RESTORE_BOOK,
  WATCH_BOOK,
} from "./Books.types";
import useAlert from "../../shared/hooks/useAlert";

export function* watchBooksSaga() {
  // @ts-ignore
  yield takeLatest(WATCH_BOOK, watchBook);
  yield takeLatest(FETCH_WATCHED, fetchBooks);
  yield takeLatest(DISMISS_BOOK, dismissBook);
  yield takeLatest(RESTORE_BOOK, restoreBook);
}

function* watchBook(action: { title: string }) {
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
    useAlert("Dodano książkę do obserwowanych.");
  } catch (error) {
    yield put(watchBookFail());
  }
}

function* fetchBooks(action) {
  try {
    const { data } = yield call(() =>
      axios.request({
        url: "/books",
        method: "GET",
        params: {
          scope: action.scope,
        },
      })
    );
    if (action.scope === "dismissed") {
      yield put(fetchDismissedSuccess(data.books));
    } else {
      yield put(fetchWatchedSuccess(data.books));
    }
  } catch (error) {
    yield put(fetchWatchedFail());
  }
}

function* dismissBook(action: { id: string }) {
  try {
    const { data } = yield call(() =>
      axios.request({
        url: `/books/${action.id}/dismiss`,
        method: "PATCH",
      })
    );
    yield put(dismissBookSuccess(data.book));
    useAlert("Usunięto.");
  } catch (error) {
    yield put(dismissBookFail());
  }
}

function* restoreBook(action: { id: string }) {
  try {
    const { data } = yield call(() =>
      axios.request({
        url: `/books/${action.id}/restore`,
        method: "PATCH",
      })
    );
    yield put(restoreBookSuccess(data.book));
    useAlert("Przywrócono.");
  } catch (error) {
    yield put(restoreBookFail());
  }
}
