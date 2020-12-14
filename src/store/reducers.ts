import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { RouteComponentProps } from "react-router-dom";

const rootReducer = (history: RouteComponentProps): void => {
  console.log(history);
  combineReducers({
    router: connectRouter(history),
  });
};

export default rootReducer;
