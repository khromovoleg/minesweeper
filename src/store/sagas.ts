import { all } from "redux-saga/effects";

import { GameSaga } from "components/store";

export default function* rootSaga(): any {
  yield all([GameSaga()]);
}
