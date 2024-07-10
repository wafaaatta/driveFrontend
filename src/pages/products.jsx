import React from "react";
import Navigation from "../components/Navigation";
import GetProducts from "../components/GetProducts";
import { NavLink } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const Products = () => {
  return (
    <>
      <div>
        <div>
          <Navigation />
          <br />
          <br />
          <NavLink to={"/products/create"}>
            <button style={{ backgroundColor: "green", color: "white" }}>
              Ajouter produit
            </button>
          </NavLink>
        </div>{" "}
        <br />
        <div className="getProducts">
          <GetProducts />
        </div>
      </div>
    </>
  );
};
export default Products;