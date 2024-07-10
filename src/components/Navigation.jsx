import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <div className="navigation">
        <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
          Accueil
        </NavLink>
        <NavLink
          to="/Categories"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          Categories
        </NavLink>
        <NavLink
          to="/Products"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          Produits
        </NavLink>
      </div>
    </>
  );
};
export default Navigation;