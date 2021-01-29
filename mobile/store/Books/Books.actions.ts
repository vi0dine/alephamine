import {
  FETCH_WATCHED,
  FETCH_WATCHED_FAIL,
  FETCH_WATCHED_SUCCESS,
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

export const fetchWatched = () => {
  return {
    type: FETCH_WATCHED,
  };
};

export const fetchWatchedSuccess = (watched) => {
  return {
    type: FETCH_WATCHED_SUCCESS,
    watchedBooks: watched,
  };
};

export const fetchWatchedFail = () => {
  return {
    type: FETCH_WATCHED_FAIL,
  };
};
