import { combineReducers } from "redux";
import userReducer from "./User/User.reducer";
import booksReducer from "./Books/Books.reducer";

const root = combineReducers({
  UserState: userReducer,
  BooksState: booksReducer,
});

export default root;
