import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";

import history from "../history";
import rootSaga from "./sagas";
import rootReducer from "./reducers";

const sagaMiddleware = createSagaMiddleware();

window.devToolsExtension =
  (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;

const store = createStore(
  rootReducer(history),
  compose(
    applyMiddleware(routerMiddleware(history), sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);

sagaMiddleware.run(rootSaga);

export default store;
