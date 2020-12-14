import { actionConstantsCreator } from "utils";

const GAMES: Array<string> = [""];

export const compose = [...GAMES];
export const constants = actionConstantsCreator(compose);

export const initialState = {
  game: {},
};
