import React from "react";

import { Switch } from "react-router";

import routeAssessor from "router/routeAssessor";
import { publicRouter } from "router";
interface RouteType {
  path: string;
  component: React.FC;
  exact: boolean;
  children: [];
}

const App: React.FC = () => {
  return (
    <div className="app">
      <Switch>
        {publicRouter.map((route: RouteType) => routeAssessor(route))}
      </Switch>
    </div>
  );
};

export default App;
