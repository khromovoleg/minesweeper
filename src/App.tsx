import React from "react";

import { Switch } from "react-router";

import routeAssessor from "router/routeAssessor";
import { publicRouter } from "router";

import "styles/index.scss";

interface RouteType {
  path: string;
  component: React.FC;
  exact: boolean;
  children: [];
}

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="container">
        <Switch>
          {publicRouter.map((route: RouteType) => routeAssessor(route))}
        </Switch>
      </div>
    </div>
  );
};

export default App;
