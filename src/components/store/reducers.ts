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
        game: action.payload.game,
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
        ...initialState.game,
        loading: false,
      };

    default:
      return { ...state };
  }
};
