import { actionConstantsCreator } from "utils";

const GAME: Array<string> = ["GAME"];

export const compose = [...GAME];
export const constants = actionConstantsCreator(compose);

export const initialState = {
  game: {
    settings: {},
    game: {
      flags: null,
      times: 0,
      board: {},
    },
    loading: false,
    error: null,
  },
};
