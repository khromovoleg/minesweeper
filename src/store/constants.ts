import { actionConstantsCreator } from "utils";

const GAME: Array<string> = ["GAME"];

export const compose = [...GAME];
export const constants = actionConstantsCreator(compose);

export const initialState = {
  game: {
    settings: {},
    history: [
      {
        game: {
          flags: null,
          times: 0,
          board: {},
          play: false,
        },
      },
    ],
    step: 0,
    mines: {},
    win: null,
    loading: false,
    error: null,
  },
};
