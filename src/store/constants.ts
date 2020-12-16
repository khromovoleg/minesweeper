import { actionConstantsCreator } from "utils";

const GAME: Array<string> = ["GAME"];

export const compose = [...GAME];
export const constants = actionConstantsCreator(compose);

export const initialState = {
  game: {
    board: {},
    loading: false,
    error: null,
  },
};
