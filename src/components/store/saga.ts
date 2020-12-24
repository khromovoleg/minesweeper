import { put, takeLatest, select } from "redux-saga/effects";

import { push } from "connected-react-router";

import { constants } from "store/constants";
import { ROUTES_PATH } from "router/constants";
import { actions } from "store/actions";
import { sagaAssessor } from "utils";
import { getGame } from "components/store/selectors";

const SetGame = ({ payload, callback }: any) =>
  sagaAssessor(
    () =>
      function* () {
        yield put(actions.GAME.SUCCEEDED(payload));
        localStorage.setItem(
          "minesweeper",
          JSON.stringify({
            settings: payload.settings,
            game: payload.game,
            mines: payload.mines,
          })
        );
        yield put(push(ROUTES_PATH.GAME));
      },
    actions.GAME.FAILED,
    callback
  );

const UpdateMines = ({ payload, callback }: any) =>
  sagaAssessor(
    () =>
      function* () {
        const game = yield select(getGame());
        //const game = JSON.parse((localStorage as any).getItem("minesweeper"));
        if (game["game"]) {
          game["game"]["flags"] = payload;
          yield put(actions.GAME.SUCCEEDED(game));
          (localStorage as any).setItem("minesweeper", JSON.stringify(game));
        }
        //yield put(push(ROUTES_PATH.GAME));
      },
    actions.GAME.FAILED,
    callback
  );

const UpdateTimes = ({ payload, callback }: any) =>
  sagaAssessor(
    () =>
      function* () {
        const game = yield select(getGame());
        //const game = JSON.parse((localStorage as any).getItem("minesweeper"));
        if (game["game"]) {
          game["game"]["times"] = payload;
          yield put(actions.GAME.SUCCEEDED(game));
          (localStorage as any).setItem("minesweeper", JSON.stringify(game));
        }
        //yield put(push(ROUTES_PATH.GAME));
      },
    actions.GAME.FAILED,
    callback
  );

const UpdateCellOpen = ({ payload, callback }: any) =>
  sagaAssessor(
    () =>
      function* () {
        const { row, col } = payload;
        const game = yield select(getGame());
        //const game = JSON.parse((localStorage as any).getItem("minesweeper"));
        if (game["game"]) {
          game["game"]["board"][row][col].opened = true;
          yield put(actions.GAME.SUCCEEDED(game));
          (localStorage as any).setItem("minesweeper", JSON.stringify(game));
        }
        //yield put(push(ROUTES_PATH.GAME));
      },
    actions.GAME.FAILED,
    callback
  );

const UpdateCellFlag = ({ payload, callback }: any) =>
  sagaAssessor(
    () =>
      function* () {
        const { row, col } = payload;
        const game = yield select(getGame());
        //const game = JSON.parse((localStorage as any).getItem("minesweeper"));
        if (game["game"]) {
          const flag = game["game"]["board"][row][col].flag;
          game["game"]["board"][row][col].flag = !flag;
          yield put(actions.GAME.SUCCEEDED(game));
          (localStorage as any).setItem("minesweeper", JSON.stringify(game));
        }
        //yield put(push(ROUTES_PATH.GAME));
      },
    actions.GAME.FAILED,
    callback
  );

const UpdateTimerAction = ({ payload, callback }: any) =>
  sagaAssessor(
    () =>
      function* () {
        const game = yield select(getGame());
        //const game = JSON.parse((localStorage as any).getItem("minesweeper"));
        if (game["game"]) {
          game["game"]["play"] = !payload;
          yield put(actions.GAME.SUCCEEDED(game));
          (localStorage as any).setItem("minesweeper", JSON.stringify(game));
        }
        //yield put(push(ROUTES_PATH.GAME));
      },
    actions.GAME.FAILED,
    callback
  );

const ResultGame = ({ payload, callback }: any) =>
  sagaAssessor(
    () =>
      function* () {
        yield put(actions.GAME.CLEARED(payload));
        (localStorage as any).setItem(
          "minesweeper",
          JSON.stringify({ win: payload })
        );
        yield put(push(ROUTES_PATH.RESULT));
      },
    actions.GAME.FAILED,
    callback
  );

export default function* gameWatcher() {
  yield takeLatest(constants.GAME.REQUESTED, SetGame);
  yield takeLatest(constants.GAME.UPDATED_MINES, UpdateMines);
  yield takeLatest(constants.GAME.UPDATED_TIMES, UpdateTimes);
  yield takeLatest(constants.GAME.UPDATED_CELL_OPEN, UpdateCellOpen);
  yield takeLatest(constants.GAME.UPDATED_CELL_FLAG, UpdateCellFlag);
  yield takeLatest(constants.GAME.UPDATED_TIMER_ACTION, UpdateTimerAction);
  yield takeLatest(constants.GAME.RESULT, ResultGame);
}
