import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["router"],
};

const persistedReducer = persistReducer(
  persistConfig,
  createRootReducer(history)
);

export const store = createStore(
  persistedReducer,
  applyMiddleware(routerMiddleware(history), sagaMiddleware)
);
export const persistor = persistStore(store);
