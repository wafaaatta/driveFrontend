import React, { useEffect, useState } from "react";
import axios from "axios";
import Category from "./Category";

const GetCategories = () => {
  const [data, setData] = useState([]);
  //Le useEffect se joue lorsque le composant est monté
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/v1/categories").then((response) => {
      setData(response.data.categories);
    });
  }, []);

  return (
    <>
      <div
        className="categories"
        style={{ display: "flex", flexDirection: "column", gap: "2em" }}
      >
        <div style={{ display: "flex", gap: "2em" }}>
          <h3>ID</h3>
          <h3>Nom</h3>
        </div>
        {data.map((category) => (
          <Category key={category.id} category={category} />
        ))}
      </div>
    </>
  );
};
export default GetCategories;