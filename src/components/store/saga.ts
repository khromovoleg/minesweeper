import { put, takeLatest } from "redux-saga/effects";

import { push } from "connected-react-router";

import { constants } from "store/constants";
import { ROUTES_PATH } from "router/constants";
import { actions } from "store/actions";
import { sagaAssessor } from "utils";

const SetSettings = ({ payload, callback }: any) =>
  sagaAssessor(
    () =>
      function* () {
        console.log(1);
        yield put(actions.GAME.SUCCEEDED(payload));
        yield put(push(ROUTES_PATH.GAME));
        //localStorage.setItem("token", token);
      },
    actions.GAME.FAILED,
    callback
  );

export default function* gameWatcher() {
  yield takeLatest(constants.GAME.REQUESTED, SetSettings);
}
