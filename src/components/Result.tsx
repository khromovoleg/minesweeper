import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import useSound from "use-sound";

import { getWin } from "components/store/selectors";
import { ROUTES_PATH } from "router/constants";

import soundWinFile from "sounds/soundWin.wav";
import soundLoseFile from "sounds/soundLose.wav";

const Result: React.FC = () => {
  const dispatch = useDispatch();
  const win = useSelector(getWin());

  const [soundWin] = useSound(soundWinFile);
  const [soundLose] = useSound(soundLoseFile);

  console.log("win", win);

  if (win === null) {
    (localStorage as any).removeItem("minesweeper");
    dispatch(push(ROUTES_PATH.WELCOME));
  }

  // useEffect(() => {
  //   if (win) {
  //     soundWin();
  //   } else {
  //     soundLose();
  //   }
  // }, [win]);

  return (
    <div className="result">
      {win ? (
        <img src="assets/icons/win.svg" alt="winner" className="result__icon" />
      ) : null}
      <h3 className="title">
        {win ? "Congratulation! You are winner!" : "You are lose! Try again!"}
      </h3>
      <div className="result__btn-wrap">
        <button
          type="button"
          className="btn"
          onClick={() => dispatch(push(ROUTES_PATH.WELCOME))}
        >
          Start new game
        </button>
      </div>
    </div>
  );
};

export default Result;
