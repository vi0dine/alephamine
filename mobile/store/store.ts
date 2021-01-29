import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import AsyncStorage from "@react-native-community/async-storage";
import root from "./reducers";
import { watchUserSaga } from "./User/User.sagas";
import { watchBooksSaga } from "./Books/Books.sagas";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, root);

export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);
export const persistor = persistStore(store);

sagaMiddleware.run(watchUserSaga);
sagaMiddleware.run(watchBooksSaga);
