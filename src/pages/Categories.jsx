import React from "react";
import Navigation from "../components/Navigation";
import GetCategories from "../components/GetCategories";
import { NavLink } from "react-router-dom";

const Categories = () => {
  return (
    <>
      <div>
        <Navigation />
        <NavLink to="/categories/create">
          <button>Ajouter une categorie</button>
        </NavLink>
        <GetCategories />
      </div>
    </>
  );
};
export default Categories;