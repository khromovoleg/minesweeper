import { constants, initialState } from "store/constants";

export default (state = initialState.game, action: any) => {
  switch (action.type) {
    case constants.GAME.REQUESTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case constants.GAME.SUCCEEDED:
      return {
        ...state,
        settings: action.payload.settings,
        history: action.payload.history,
        mines: action.payload.mines,
        loading: false,
        error: null,
      };
    case constants.GAME.FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case constants.GAME.CLEARED:
      return {
        ...state,
        win: action.payload,
        loading: false,
      };

    default:
      return { ...state };
  }
};
