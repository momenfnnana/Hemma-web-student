import React from "react";
import { Route } from "react-router";

export default (
  <Route>
    <Route path="/auth/login" />
    <Route path="/auth/register" />
    <Route path="/categories" />
    <Route path="/categories/details/:slug" />
    <Route path="/course/details/:slug" />
     <Route path="/booklet" />
  </Route>
);
