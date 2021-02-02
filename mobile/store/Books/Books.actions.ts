import {
  DISMISS_BOOK,
  DISMISS_BOOK_FAIL,
  DISMISS_BOOK_SUCCESS,
  FETCH_DISMISSED_SUCCESS,
  FETCH_WATCHED,
  FETCH_WATCHED_FAIL,
  FETCH_WATCHED_SUCCESS,
  RESTORE_BOOK,
  RESTORE_BOOK_FAIL,
  RESTORE_BOOK_SUCCESS,
  WATCH_BOOK,
  WATCH_BOOK_FAIL,
  WATCH_BOOK_SUCCESS,
} from "./Books.types";

export const watchBook = (title: String) => {
  return {
    type: WATCH_BOOK,
    title,
  };
};

export const watchBookSuccess = () => {
  return {
    type: WATCH_BOOK_SUCCESS,
  };
};

export const watchBookFail = () => {
  return {
    type: WATCH_BOOK_FAIL,
  };
};

export const dismissBook = (id: String) => {
  return {
    type: DISMISS_BOOK,
    id,
  };
};

export const dismissBookSuccess = (book) => {
  return {
    type: DISMISS_BOOK_SUCCESS,
    book,
  };
};

export const dismissBookFail = () => {
  return {
    type: DISMISS_BOOK_FAIL,
  };
};

export const restoreBook = (id: String) => {
  return {
    type: RESTORE_BOOK,
    id,
  };
};

export const restoreBookSuccess = (book) => {
  return {
    type: RESTORE_BOOK_SUCCESS,
    book,
  };
};

export const restoreBookFail = () => {
  return {
    type: RESTORE_BOOK_FAIL,
  };
};

export const fetchWatched = (scope: String) => {
  return {
    type: FETCH_WATCHED,
    scope: scope,
  };
};

export const fetchWatchedSuccess = (watched) => {
  return {
    type: FETCH_WATCHED_SUCCESS,
    watchedBooks: watched,
  };
};

export const fetchDismissedSuccess = (dismissed) => {
  return {
    type: FETCH_DISMISSED_SUCCESS,
    dismissedBooks: dismissed,
  };
};

export const fetchWatchedFail = () => {
  return {
    type: FETCH_WATCHED_FAIL,
  };
};
