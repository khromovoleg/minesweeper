import React from "react";
import { Route, Switch } from "react-router";

interface RouteType {
  path: string;
  component: React.FC;
  exact: boolean;
  children: [];
}

const routeAssessor = (
  route: RouteType,
  parentRoutePath?: string
): JSX.Element => {
  const { children, component, exact, path } = route;

  const fullPath = parentRoutePath ? `${parentRoutePath}${path}` : path;

  if (!children.length) {
    return (
      <Route
        key={fullPath}
        path={fullPath}
        exact={exact}
        component={component}
      />
    );
  } else {
    return (
      <Switch key="parent">
        <Route
          key={fullPath}
          path={fullPath}
          exact={exact}
          component={component}
        />
        {children.map((childRoute: RouteType) =>
          routeAssessor(childRoute, path)
        )}
      </Switch>
    );
  }
};

export default routeAssessor;
