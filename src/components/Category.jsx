import axios from "axios";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Category = ({ category }) => {
  // const navigate = useNavigate();
  const deleteCategory = (e, id) => {
    e.preventDefault();
    axios
      .delete(`http://127.0.0.1:8000/api/v1/categories/${id}`)
      .then((response) => {
        alert(response.data.message);
        window.location.reload(false);
      });
  };
  return (
    <div style={{ display: "flex", gap: "2em" }} className="category">
      <div>{category.id}</div>
      <div>{category.name}</div>
      <div className="btns">
        <button
          type="button"
          onClick={(e) => {
            deleteCategory(e, category.id);
          }}
          className="delete-btn"
        >
          Supprimer
        </button>
        <NavLink to={`/categories/${category.id}/update`}>
          <button className="edit-btn">Modifier</button>
        </NavLink>
      </div>
    </div>
  );
};
export default Category;
