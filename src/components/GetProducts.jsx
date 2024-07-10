import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchBarValue, setSearchBarValue] = useState("");

  //if image exists, get the real path to display it ;
  const getImageUrl = (image) => {
    if (image) {
      return "http://127.0.0.1:8000/" + image;
    }
  };

  const getProducts = () => {
    axios.get("http://127.0.0.1:8000/api/v1/products").then((response) => {
      setProducts(response.data);
    });
  };

  //delete product function;
  const deleteProduct = (e, id) => {
    e.preventDefault();
    axios
      .delete(`http://127.0.0.1:8000/api/v1/products/${id}`)
      .then((response) => {
        console.log(response);
        alert(response.data.message);
        window.location.reload(false);
      });
  };

  const setValue = (inputText) => {
    setSearchBarValue(inputText);
    console.log("searchBarValue =>", searchBarValue);
    console.log("inputText =>", inputText);

    if (inputText === "") {
      return getProducts();
    }
    setProducts(
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(inputText) ||
          product.category.some((category) =>
            category.toLowerCase().includes(inputText)
          )
      )
    );
  };

  //get all products and set them;
  useEffect(() => {
    getProducts();
  }, []);

  // useEffect(() => {
  //   if (searchBarValue === "") {
  //     return getProducts();
  //   }
  //   setProducts(
  //     products.filter((product) =>
  //       product.name.toLowerCase().includes(searchBarValue)
  //     )
  //   );
  // }, [searchBarValue]);

  return (
    <>
      <SearchBar value={searchBarValue} setValue={setValue} />
      <div>
        <div className="products">
          {products.map((product) => (
            // <SearchBar />
            <div key={product.id} className="product">
              <img
                style={{ width: "200px", height: "100px", marginTop: "5px" }}
                src={getImageUrl(product.image)}
                alt=""
              />
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>{product.price + " €"}</p>
              <p className="category-name">{product.category}</p>
              <div>
                <NavLink to={`/products/${product.id}/update`}>
                  <button>Modifier</button>
                </NavLink>
                <button
                  onClick={(e) => {
                    deleteProduct(e, product.id);
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default GetProducts;
