import { ROUTES_PATH } from "./constants";

import Welcome from "components/Welcome";
import Board from "components/Board";
import Result from "components/Result";

interface RouteType {
  path: string;
  component: React.FC;
  exact: boolean;
  children: [];
}

export const publicRouter: Array<RouteType> = [
  {
    path: ROUTES_PATH.WELCOME,
    component: Welcome,
    exact: true,
    children: [],
  },
  {
    path: ROUTES_PATH.GAME,
    component: Board,
    exact: true,
    children: [],
  },
  {
    path: ROUTES_PATH.RESULT,
    component: Result,
    exact: true,
    children: [],
  },
];
