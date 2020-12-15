import { actionConstantsCreator } from "utils";

const GAME: Array<string> = ["GAME"];

export const compose = [...GAME];
export const constants = actionConstantsCreator(compose);

export const initialState = {
  game: {
    board: {
      cols: 0,
      rows: 0,
    },
    mines: 0,
    loading: false,
    error: null,
  },
};
