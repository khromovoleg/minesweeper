import { put, takeLatest, select } from "redux-saga/effects";

import { push } from "connected-react-router";
import { isEmpty } from "lodash";

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
            history: payload.history,
            mines: payload.mines,
            step: payload.step,
          })
        );
        yield put(push(ROUTES_PATH.GAME));
      },
    actions.GAME.FAILED,
    callback
  );

// const UpdateMines = ({ payload, callback }: any) =>
//   sagaAssessor(
//     () =>
//       function* () {
//         const game = yield select(getGame());
//         //const game = JSON.parse((localStorage as any).getItem("minesweeper"));
//         if (!isEmpty(game)) {
//           const lastStep = game["history"][game["history"].length - 1];
//           const newStep = JSON.parse(JSON.stringify(lastStep));
//           newStep["game"]["flags"] = payload;
//           game["history"] = game["history"].concat([{ ...newStep }]);
//           yield put(actions.GAME.SUCCEEDED(game));
//           (localStorage as any).setItem("minesweeper", JSON.stringify(game));
//         }
//         //yield put(push(ROUTES_PATH.GAME));
//       },
//     actions.GAME.FAILED,
//     callback
//   );

const UpdateTimes = ({ payload, callback }: any) =>
  sagaAssessor(
    () =>
      function* () {
        const game = yield select(getGame());
        //const game = JSON.parse((localStorage as any).getItem("minesweeper"));
        if (!isEmpty(game)) {
          game["history"][game["history"].length - 1]["game"][
            "times"
          ] = payload;
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
        if (!isEmpty(game)) {
          // game["history"][game["history"].length - 1]["game"]["board"][row][
          //   col
          // ].opened = true;
          const history = game["history"].slice(0, game["step"] + 1);
          //console.log("history", history);
          const lastStep = history[history.length - 1];
          //lastStep["game"]["play"] = false;
          const newStep = JSON.parse(JSON.stringify(lastStep));
          newStep["game"]["board"][row][col].opened = true;
          //newStep["game"]["play"] = true;
          game["history"] = history.concat([{ ...newStep }]);
          game["step"] = game["step"] + 1;
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
        const {
          cell: { row, col },
          flagsCount,
        } = payload;
        const game = yield select(getGame());
        //const game = JSON.parse((localStorage as any).getItem("minesweeper"));
        if (!isEmpty(game)) {
          // const flag =
          //   game["history"][game["history"].length - 1]["game"]["board"][row][
          //     col
          //   ].flag;
          // game["history"][game["history"].length - 1]["game"]["board"][row][
          //   col
          // ].flag = !flag;
          const history = game["history"].slice(0, game["step"] + 1);
          //console.log("history", history);
          const lastStep = history[history.length - 1];
          //lastStep["game"]["play"] = false;
          const newStep = JSON.parse(JSON.stringify(lastStep));
          const flag = newStep["game"]["board"][row][col].flag;
          newStep["game"]["board"][row][col].flag = !flag;
          newStep["game"]["flags"] = flagsCount;
          //newStep["game"]["play"] = true;
          game["history"] = history.concat([{ ...newStep }]);
          game["step"] = game["step"] + 1;
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
        if (!isEmpty(game)) {
          game["history"][game["history"].length - 1]["game"][
            "play"
          ] = !payload;
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
        console.log("payload", payload);
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

const UpdateStep = ({ payload, callback }: any) =>
  sagaAssessor(
    () =>
      function* () {
        console.log("update");
        const game = yield select(getGame());
        if (!isEmpty(game)) {
          game["step"] = payload;
          yield put(actions.GAME.UPDATE_STEP(payload));
          (localStorage as any).setItem("minesweeper", JSON.stringify(game));
        }
        // (localStorage as any).setItem(
        //   "minesweeper",
        //   JSON.stringify({ step: payload })
        // );
        //yield put(push(ROUTES_PATH.GAME));
      },
    actions.GAME.FAILED,
    callback
  );

export default function* gameWatcher() {
  yield takeLatest(constants.GAME.REQUESTED, SetGame);
  //yield takeLatest(constants.GAME.UPDATED_MINES, UpdateMines);
  yield takeLatest(constants.GAME.UPDATED_TIMES, UpdateTimes);
  yield takeLatest(constants.GAME.UPDATED_CELL_OPEN, UpdateCellOpen);
  yield takeLatest(constants.GAME.UPDATED_CELL_FLAG, UpdateCellFlag);
  yield takeLatest(constants.GAME.UPDATED_TIMER_ACTION, UpdateTimerAction);
  yield takeLatest(constants.GAME.RESULT, ResultGame);
  yield takeLatest(constants.GAME.UPDATED_STEP, UpdateStep);
}
