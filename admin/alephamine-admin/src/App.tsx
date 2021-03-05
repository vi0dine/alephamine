import React from "react";
import "./App.scss";
import MainRouter from "./router/router";
import { Provider } from "react-redux";
import { history, persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { ConnectedRouter } from "connected-react-router";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <MainRouter />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
