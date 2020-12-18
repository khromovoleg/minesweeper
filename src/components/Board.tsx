import React, { BaseSyntheticEvent, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { isEmpty } from "lodash";

import { generateBoard } from "utils";
import { getBoard } from "components/store/selectors";
import { actions } from "store/actions";
import { ROUTES_PATH } from "router/constants";

import "styles/index.scss";

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const [time, setTime] = useState(0);
  const [timerWork, setTimerWork] = useState(true);
  let board = useSelector(getBoard());
  let intervalId: any = null;
  const { rows, cols, mines } = board;

  if (isEmpty(board)) {
    board = JSON.parse((localStorage as any).getItem("board"));
    dispatch(actions.GAME.REQUESTED(board));
  }

  useEffect(() => {
    if (!isEmpty(board)) {
      generateBoard(board);
    }
  }, [board]);

  useEffect(() => {
    if (timerWork) {
      intervalId = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [timerWork]);

  const timeFormat = (time: any) => {
    let seconds: any = time;
    let minutes: any = Math.floor(seconds / 60);
    let hours: any = "";

    if (minutes > 59) {
      hours = Math.floor(minutes / 60);
      minutes = minutes - hours * 60;
    }

    seconds = Math.floor(seconds % 60);

    hours = hours >= 10 ? hours : "0" + hours;
    minutes = minutes >= 10 ? minutes : "0" + minutes;
    seconds = seconds >= 10 ? seconds : "0" + seconds;

    return hours + ":" + minutes + ":" + seconds;
  };

  const handleTimerPause = (e: BaseSyntheticEvent) => {
    let buttonText = "Play";

    if (!timerWork) {
      buttonText = "Pause";
    }

    e.currentTarget.textContent = buttonText;
    setTimerWork(!timerWork);
  };

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
              <span className="board__panel-value">{mines}</span>
            </div>
            <div className="board__panel-column">
              <span className="board__panel-label">Время:</span>
              <span className="board__panel-value">{timeFormat(time)}</span>
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
          <div id="table" className="board__table"></div>
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
