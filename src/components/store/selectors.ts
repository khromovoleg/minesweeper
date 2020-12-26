import { createSelector } from "reselect";

const gameState = (state: any) => state.gameReducer;

export const getGame = () => createSelector(gameState, (state) => state);

export const getSettings = () =>
  createSelector(gameState, (state) => state.settings);

export const getWin = () => createSelector(gameState, (state) => state.win);

//export const getStep = () => createSelector(gameState, (state) => state.step);
