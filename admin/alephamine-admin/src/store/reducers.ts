import { combineReducers } from "redux";
import userReducer from "./User/User.reducer";
import { connectRouter } from "connected-react-router";

const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    UserState: userReducer,
  });

export default createRootReducer;
