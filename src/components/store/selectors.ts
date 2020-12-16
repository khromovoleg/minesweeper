import { createSelector } from "reselect";

const gameState = (state: any) => state.gameReducer;

export const getGame = () => createSelector(gameState, (state) => state);

export const getBoard = () => createSelector(gameState, (state) => state.board);
