import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";

import { getWin } from "components/store/selectors";
import { ROUTES_PATH } from "router/constants";

const Result: React.FC = () => {
  const dispatch = useDispatch();
  const win = useSelector(getWin());

  if (win === null) {
    (localStorage as any).removeItem("minesweeper");
    dispatch(push(ROUTES_PATH.WELCOME));
  }

  return (
    <div className="result">
      {win ? (
        <img src="assets/icons/win.svg" alt="winner" className="result__icon" />
      ) : null}
      <h3 className="title">
        {win ? "Congratulation! You are winner!" : "You are lose! Try again!"}
      </h3>
      <button
        type="button"
        className="btn result__btn"
        onClick={() => dispatch(push(ROUTES_PATH.WELCOME))}
      >
        Start new game
      </button>
    </div>
  );
};

export default Result;
