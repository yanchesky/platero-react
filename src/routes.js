import React                from "react"
import { Route }            from "react-router-dom";
import {
  mainRoutes,
  otherRoutes
}                           from "./linksAndRoutes"

const renderSiteRoutes = (language) => {
  return [...mainRoutes[language], ...otherRoutes].map((route, index) =>
    <Route key={index} exact={!!route.exact} path={route.path}>{route.Component}</Route>
  )
};

export default ({ lang }) => renderSiteRoutes(lang);

