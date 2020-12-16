import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import { devToolsEnhancer } from "redux-devtools-extension";

import history from "../history_";
import rootSaga from "./sagas";
import rootReducer from "./reducers";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer(history),
  compose(
    applyMiddleware(routerMiddleware(history), sagaMiddleware),
    devToolsEnhancer({})
  )
);

sagaMiddleware.run(rootSaga);

export default store;
