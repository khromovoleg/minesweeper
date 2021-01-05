import React, { BaseSyntheticEvent, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { isEmpty } from "lodash";
import useSound from "use-sound";

import { checkWinner } from "utils";
import { getGame } from "components/store/selectors";
import { actions } from "store/actions";
import { ROUTES_PATH } from "router/constants";

import Table from "components/Table";
import Timer from "components/Timer";

import soundFlagFile from "sounds/soundFlag.wav";
import soundMineFile from "sounds/soundMine.wav";
import soundMouseClickFile from "sounds/soundMouseClick.wav";
import soundBtnClickFile from "sounds/soundBtnClick.wav";
import soundErrorFile from "sounds/soundError.wav";

import "styles/index.scss";

const Game: React.FC = () => {
  const dispatch = useDispatch();
  const { settings, history, step } = useSelector(getGame());
  const { rows, cols } = settings;
  const currentHistory = history[step];
  const {
    game: { board, flags, times, play },
  } = currentHistory;
  const tempBoard = JSON.parse(JSON.stringify(board));
  const [playError, setPlayError] = useState(false);
  const [checkWinStatus, setCheckWinStatus] = useState(false);
  let textButton = play ? "Pause" : "Play";
  const prev = history[step - 1] ? step - 1 : null;
  const next = history[step + 1] ? step + 1 : null;

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
    } else {
      dispatch(push(ROUTES_PATH.WELCOME));
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

  const isValid = (i: any, j: any) => {
    return i >= 0 && i < rows && j >= 0 && j < cols;
  };

  const floodFill = (i: any, j: any) => {
    if (!isValid(i, j) || tempBoard[i][j].opened === true) {
      return;
    }

    if (Number(tempBoard[i][j].number) > 0) {
      tempBoard[i][j].opened = true;
      return;
    }

    if (
      Number(tempBoard[i][j].number) === 0 &&
      tempBoard[i][j].number !== null
    ) {
      tempBoard[i][j].opened = true;

      floodFill(i, j - 1);
      floodFill(i, j + 1);
      floodFill(i - 1, j);
      floodFill(i + 1, j);
    }
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
          floodFill(Number(coordinats[0]), Number(coordinats[1]));

          dispatch(actions.GAME.UPDATED_CELL_OPEN(tempBoard));

          if (!classes.contains(classMine)) {
            soundMouseClick();
          } else {
            soundMine();
          }

          if (classes.contains(classMine)) {
            changeTextButton();
          }

          setTimeout(() => {
            if (classes.contains(classMine)) {
              dispatch(actions.GAME.RESULT(false));
            }
          }, 2000);

          setCheckWinStatus(true);
          classes.add(classOpen);
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
        }
      }

      if (next !== null) {
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
    }
  };

  useEffect(() => {
    if (checkWinStatus) {
      const checkWin = checkWinner(tempBoard);

      setTimeout(() => {
        if (checkWin) {
          dispatch(actions.GAME.RESULT(true));
        }
      }, 2000);
    }

    return () => {
      setCheckWinStatus(false);
    };
  }, [checkWinStatus]);

  return (
    <div className="board">
      <h1 className="title">Game</h1>
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
            <div className="board__panel-column board__panel-column--time">
              <span className="board__panel-label">Time:</span>
              <span className="board__panel-value">
                <Timer play={play} times={times} />
              </span>
            </div>
          </div>
          <div className="board__btn-wrap">
            <button
              type="button"
              onClick={handleTimerPause}
              className="btn board__btn board__btn--pause"
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
            <Table board={board} handleClickCell={handleClickCell} />
          </div>
          <div className="board__nav">
            <button
              type="button"
              className="btn board__btn"
              onClick={() => handleNavClick(prev)}
              disabled={prev !== null ? false : true}
              //title={prev !== null ? prev : ""}
            >
              Prev
            </button>
            <button
              type="button"
              className="btn board__btn"
              onClick={() => handleNavClick(next)}
              disabled={next !== null ? false : true}
              title={next !== null ? next : ""}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div>
          <h3>Set Board Sizes.</h3>
          <div className="board__nav">
            <button
              type="button"
              className="btn"
              onClick={() => dispatch(push(ROUTES_PATH.WELCOME))}
            >
              Back to Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
