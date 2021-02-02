import {
  DISMISS_BOOK_SUCCESS,
  FETCH_DISMISSED_SUCCESS,
  FETCH_WATCHED,
  FETCH_WATCHED_FAIL,
  FETCH_WATCHED_SUCCESS,
  RESTORE_BOOK_SUCCESS,
  WATCH_BOOK,
  WATCH_BOOK_FAIL,
  WATCH_BOOK_SUCCESS,
} from "./Books.types";

const INITIAL_STATE = {
  watchedBooks: [],
  dismissedBooks: [],
  loading: false,
};

const booksReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case WATCH_BOOK:
      return {
        ...state,
        loading: true,
      };
    case WATCH_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case WATCH_BOOK_FAIL:
      return {
        ...state,
        loading: false,
      };
    case FETCH_WATCHED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_WATCHED_SUCCESS:
      return {
        ...state,
        watchedBooks: action.watchedBooks,
        loading: false,
      };
    case FETCH_DISMISSED_SUCCESS:
      return {
        ...state,
        dismissedBooks: action.dismissedBooks,
        loading: false,
      };
    case FETCH_WATCHED_FAIL:
      return {
        ...state,
        loading: false,
      };
    case DISMISS_BOOK_SUCCESS:
      return {
        ...state,
        dismissedBooks: state.dismissedBooks.concat(action.book),
        watchedBooks: state.watchedBooks.filter((b) => b.id !== action.book.id),
      };
    case RESTORE_BOOK_SUCCESS:
      return {
        ...state,
        watchedBooks: state.watchedBooks.concat(action.book),
        dismissedBooks: state.dismissedBooks.filter(
          (b) => b.id !== action.book.id
        ),
      };
    default:
      return { ...state };
  }
};

export default booksReducer;
