import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { isEmpty } from "lodash";

import { generateBoard } from "utils";
import { getBoard } from "components/store/selectors";
//import { actions } from "store/actions";
import { ROUTES_PATH } from "router/constants";

import "styles/index.scss";

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const board = useSelector(getBoard());

  // if (!board) {
  //   board = JSON.parse((localStorage as any).getItem("board"));
  //   dispatch(actions.GAME.REQUESTED(board));
  // }

  useEffect(() => {
    if (!isEmpty(board)) {
      generateBoard(board);
    }
  }, [board]);

  return (
    <div className="board">
      <h1 className="title">Board</h1>
      {!isEmpty(board) ? (
        <>
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
