import React, { BaseSyntheticEvent, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { isEmpty } from "lodash";

import { GenerateBoard } from "utils";
import { getGame } from "components/store/selectors";
import { actions } from "store/actions";
import { ROUTES_PATH } from "router/constants";

import Timer from "components/Timer";

import "styles/index.scss";

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const { settings, game } = useSelector(getGame());
  const { rows, cols } = settings;
  const { board, flags, times } = game;

  const [timerWork, setTimerWork] = useState(true);

  if (isEmpty(settings)) {
    const minesweeper = JSON.parse(
      (localStorage as any).getItem("minesweeper")
    );
    if (!isEmpty(minesweeper)) {
      dispatch(
        actions.GAME.REQUESTED({
          settings: minesweeper.settings,
          game: minesweeper.game,
        })
      );
    }
  }

  const handleTimerPause = (e: BaseSyntheticEvent) => {
    let buttonText = "Play";

    if (!timerWork) {
      buttonText = "Pause";
    }

    e.currentTarget.textContent = buttonText;
    setTimerWork(!timerWork);
  };

  const handleClickCell = (e: BaseSyntheticEvent) => {
    const classes = e.target.classList;
    const classOpen = "table__cell--open";
    const classFlag = "table__cell--flag";
    const coordinats = e.currentTarget.dataset.cell.split("-");
    console.log("e.target", coordinats);

    if (e.type === "click") {
      if (!classes.contains(classOpen) && !classes.contains(classFlag)) {
        classes.add(classOpen);
        dispatch(
          actions.GAME.UPDATED_CELL_OPEN({
            row: coordinats[0],
            col: coordinats[1],
          })
        );
      }
    } else if (e.type === "contextmenu") {
      e.preventDefault();
      if (!classes.contains(classOpen)) {
        if (flags > 0) {
          let flagsCount = flags;
          if (!classes.contains(classFlag)) {
            classes.add(classFlag);
            flagsCount--;
          } else {
            classes.remove(classFlag);
            flagsCount++;
          }
          dispatch(
            actions.GAME.UPDATED_CELL_FLAG({
              row: coordinats[0],
              col: coordinats[1],
            })
          );
          dispatch(actions.GAME.UPDATED_MINES(flagsCount));
        }
      }
    }
  };

  return (
    <div className="board">
      <h1 className="title">Board</h1>
      {!isEmpty(settings) ? (
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
              <span className="board__panel-value">{flags}</span>
            </div>
            <div className="board__panel-column">
              <span className="board__panel-label">Время:</span>
              <span className="board__panel-value">
                <Timer timerWork={timerWork} times={times} />
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
            <GenerateBoard board={board} handleClickCell={handleClickCell} />
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
