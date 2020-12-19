import React, { BaseSyntheticEvent, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { isEmpty } from "lodash";

import { GenerateBoard } from "utils";
import { getBoard } from "components/store/selectors";
import { actions } from "store/actions";
import { ROUTES_PATH } from "router/constants";

import Timer from "components/Timer";

import "styles/index.scss";

const Board: React.FC = () => {
  const dispatch = useDispatch();
  let board = useSelector(getBoard());
  //let createTable: any = "";
  const { rows, cols, mines } = board;
  const [countMains, setCountMines] = useState(mines);
  const [timerWork, setTimerWork] = useState(true);

  if (isEmpty(board)) {
    board = JSON.parse((localStorage as any).getItem("board"));
    dispatch(actions.GAME.REQUESTED(board));
  }

  const handleTimerPause = (e: BaseSyntheticEvent) => {
    let buttonText = "Play";

    if (!timerWork) {
      buttonText = "Pause";
    }

    e.currentTarget.textContent = buttonText;
    setTimerWork(!timerWork);
  };

  // useEffect(() => {
  //   if (!isEmpty(board)) {
  //     createTable = generateBoard(board);
  //   }
  // }, [board]);

  return (
    <div className="board">
      <h1 className="title">Board</h1>
      {!isEmpty(board) ? (
        <>
          <div className="board__panel">
            <div className="board__panel-column">
              <span className="board__panel-label">Поле:</span>
              <span className="board__panel-value">
                {rows}x{cols}
              </span>
            </div>
            <div className="board__panel-column">
              <span className="board__panel-label">Мины:</span>
              <span className="board__panel-value">{countMains}</span>
            </div>
            <div className="board__panel-column">
              <span className="board__panel-label">Время:</span>
              <span className="board__panel-value">
                <Timer timerWork={timerWork} />
              </span>
            </div>
          </div>
          <div className="board__btn-pause-wrap">
            <button
              type="button"
              onClick={handleTimerPause}
              className="board__btn-pause"
            >
              Pause
            </button>
          </div>
          <div id="table" className="board__table">
            <GenerateBoard {...board} setCountMines={setCountMines} />
          </div>
        </>
      ) : (
        <div>
          <h3>Set Board Sizes.</h3>
          <button
            type="button"
            onClick={() => dispatch(push(ROUTES_PATH.WELCOME))}
          >
            Back to Settings
          </button>
        </div>
      )}
    </div>
  );
};

export default Board;
