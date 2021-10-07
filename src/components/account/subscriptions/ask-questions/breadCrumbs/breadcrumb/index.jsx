import React from "react";
import { NavLink } from "react-router-dom";

export default function Breadcrumb({ name, path = "/" }) {
  return <NavLink to={path}>{name}</NavLink>;
}
