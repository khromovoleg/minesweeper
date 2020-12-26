import React, { BaseSyntheticEvent, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { isEmpty } from "lodash";
import useSound from "use-sound";

import { GenerateBoard, checkWinner } from "utils";
import { getGame } from "components/store/selectors";
import { actions } from "store/actions";
import { ROUTES_PATH } from "router/constants";

import Timer from "components/Timer";

import soundFlagFile from "sounds/soundFlag.wav";
import soundMineFile from "sounds/soundMine.wav";
import soundMouseClickFile from "sounds/soundMouseClick.wav";
import soundBtnClickFile from "sounds/soundBtnClick.wav";
import soundErrorFile from "sounds/soundError.wav";

import "styles/index.scss";

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const { settings, history, step } = useSelector(getGame());
  const { rows, cols } = settings;
  //const [step, setStep] = useState(history.length - 1);
  //const step = history.length - 1;
  //console.log("step", step);
  const currentHistory = history[step];
  //console.log("currentHistory", currentHistory);
  const prev = history[step - 1] ? step - 1 : null;
  const next = history[step + 1] ? step + 1 : null;

  // console.log("prev", prev);
  // console.log("next", next);
  const {
    game: { board, flags, times, play },
  } = currentHistory;
  const [playError, setPlayError] = useState(false);
  let textButton = play ? "Pause" : "Play";

  const [soundFlag] = useSound(soundFlagFile);
  const [soundMine] = useSound(soundMineFile);
  const [soundMouseClick] = useSound(soundMouseClickFile);
  const [soundBtnClick] = useSound(soundBtnClickFile);
  const [soundError] = useSound(soundErrorFile);

  if (isEmpty(settings)) {
    const minesweeper = JSON.parse(
      (localStorage as any).getItem("minesweeper")
    );

    if (!isEmpty(minesweeper)) {
      dispatch(
        actions.GAME.REQUESTED({
          settings: minesweeper.settings,
          history: minesweeper.history,
          mines: minesweeper.mines,
          step: minesweeper.step,
        })
      );
    }
  }

  const changeTextButton = () => {
    dispatch(actions.GAME.UPDATED_TIMER_ACTION(play));

    if (!play) {
      textButton = "Play";
      setPlayError(false);
    }

    soundBtnClick();
  };

  const handleTimerPause = () => {
    changeTextButton();
  };

  const handleClickCell = (e: BaseSyntheticEvent) => {
    if (play) {
      const classes = e.target.classList;
      const classOpen = "table__cell--open";
      const classFlag = "table__cell--flag";
      const classMine = "table__cell--mine";
      const coordinats = e.currentTarget.dataset.cell.split("-");

      if (e.type === "click") {
        if (!classes.contains(classOpen) && !classes.contains(classFlag)) {
          classes.add(classOpen);
          if (!classes.contains(classMine)) {
            soundMouseClick();
          } else {
            soundMine();
          }

          dispatch(
            actions.GAME.UPDATED_CELL_OPEN({
              row: coordinats[0],
              col: coordinats[1],
            })
          );

          const checkWin = checkWinner(board);

          if (checkWin || classes.contains(classMine)) {
            changeTextButton();
          }

          setTimeout(() => {
            if (checkWin) {
              dispatch(actions.GAME.RESULT(true));
            }

            if (classes.contains(classMine)) {
              dispatch(actions.GAME.RESULT(false));
            }
          }, 2000);
        }
      } else if (e.type === "contextmenu") {
        e.preventDefault();
        soundFlag();
        if (!classes.contains(classOpen)) {
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
              cell: {
                row: coordinats[0],
                col: coordinats[1],
              },
              flagsCount,
            })
          );
          //dispatch(actions.GAME.UPDATED_MINES(flagsCount));
        }
      }

      //console.log("!!!!!!!!!!!!!!!!!!!11111", next);
      if (next !== null) {
        //console.log("!!!!!!!!!!!!!!!!!!!2222", next);
        //setStep(next);
        handleNavClick(next);
      }
    } else {
      e.preventDefault();
      soundError();
      setPlayError(true);
    }
  };

  const handleNavClick = (step: number | null): void => {
    if (step !== null) {
      dispatch(actions.GAME.UPDATED_STEP(step));
      //setStep(step);
    }
  };

  return (
    <div className="board">
      <h1 className="title">Board</h1>
      {!isEmpty(settings) ? (
        <>
          <div className="board__panel">
            <div className="board__panel-column">
              <span className="board__panel-label">Board:</span>
              <span className="board__panel-value">
                {rows}x{cols}
              </span>
            </div>
            <div className="board__panel-column">
              <span className="board__panel-label">Mines:</span>
              <span className="board__panel-value">{flags}</span>
            </div>
            <div className="board__panel-column">
              <span className="board__panel-label">Time:</span>
              <span className="board__panel-value">
                <Timer play={play} times={times} />
              </span>
            </div>
          </div>
          <div className="board__btn-pause-wrap">
            <button
              type="button"
              onClick={handleTimerPause}
              className="board__btn-pause"
            >
              {textButton}
            </button>
            {playError ? (
              <span className="board__text-error">
                If you want to continue game press Play.
              </span>
            ) : null}
          </div>
          <div id="table" className="board__table">
            <GenerateBoard board={board} handleClickCell={handleClickCell} />
          </div>
          <div className="board__nav">
            <button
              type="button"
              onClick={() => handleNavClick(prev)}
              disabled={prev !== null ? false : true}
              title="asdf"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => handleNavClick(next)}
              disabled={next !== null ? false : true}
              title={next !== null ? next : ""}
            >
              Next
            </button>
            <div>{step}</div>
          </div>
        </>
      ) : (
        <div>
          <h3>Set Board Sizes.</h3>
          <button
            type="button"
            className="btn board__btn"
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
