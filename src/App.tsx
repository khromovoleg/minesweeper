import React from "react";

import { Switch } from "react-router";

import routeAssessor from "router/routeAssessor";
import { publicRouter } from "router";

const App: React.FC = () => {
  return (
    <div className="app">
      <Switch>{publicRouter.map((route: any) => routeAssessor(route))}</Switch>
    </div>
  );
};

export default App;
