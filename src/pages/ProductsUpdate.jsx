import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductsUpdate = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    stock: "",
    image: "",
  });
  let { id } = useParams();

  useEffect(() => {
    getProductById(id);
    getCategories();
  }, [id]);

  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    axios.get(`http://127.0.0.1:8000/api/v1/categories/`).then((response) => {
      setCategories(response.data.categories);
    });
  };

  const getProductById = (id) => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      });
  };

  const handleInput = (e, type) => {
    e.persist();
    switch (type) {
      case "name":
        setProduct((currentProduct) => {
          return {
            ...currentProduct,
            name: e.target.value,
          };
        });
        return;
      case "description":
        setProduct((currentProduct) => {
          return {
            ...currentProduct,
            description: e.target.value,
          };
        });
        return;
      case "price":
        setProduct((currentProduct) => {
          return {
            ...currentProduct,
            price: e.target.value,
          };
        });
        return;
      case "stock":
        setProduct((currentProduct) => {
          return {
            ...currentProduct,
            stock: e.target.value,
          };
        });
        return;
      case "checkbox":
        setProduct((currentProduct) => {
          return {
            ...currentProduct,
            categories: [e.target.value],
          };
        });
        return;
      case "image":
        setProduct((currentProduct) => {
          return {
            ...currentProduct,
            image: e.target.files[0],
          };
        });
        return;
    }
  };

  const navigate = useNavigate();

  console.log("Product =>", product);

  const updateProduct = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", product.name);
    data.append("description", product.description);
    data.append("price", product.price);
    data.append("stock", product.stock);
    data.append("categories", JSON.stringify(product.categories));
    if (product.image) {
      data.append("image", product.image);
    }

    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(
        `http://127.0.0.1:8000/api/v1/products/${id}?_method=PUT`,
        data,
        headers
      )
      .then((response) => {
        console.log(response);
        alert(response.data.message);
        navigate("/products");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container-form">
        <h2>Modifier produit</h2>
        <form onSubmit={updateProduct} encType="multipart/form-data">
          <div>
            <label htmlFor="">Nom : </label>
            <br />
            <input
              name="name"
              value={product.name}
              onChange={(e) => handleInput(e, "name")}
              type="text"
              required
            />
          </div>
          <div>
            <label htmlFor="">Description : </label>
            <br />
            <textarea
              value={product.description}
              onChange={(e) => handleInput(e, "description")}
              name="description"
              id=""
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="">Prix : </label>
            <br />
            <input
              name="price"
              value={product.price}
              onChange={(e) => handleInput(e, "price")}
              type="text"
              required
            />
          </div>
          <div>
            <label htmlFor="">Stock : </label>
            <br />
            <input
              name="stock"
              value={product.stock}
              onChange={(e) => handleInput(e, "stock")}
              type="text"
              required
            />
          </div>
          <div style={{ display: "flex" }}>
            {categories &&
              categories.map((category) => (
                <div key={category.id}>
                  <label htmlFor="">{category.name} </label>
                  <br />
                  <input
                    onChange={(e) => handleInput(e, "checkbox")}
                    type="checkbox"
                    value={category.id}
                    name="categories"
                  />
                </div>
              ))}
          </div>
          <div>
            <label htmlFor="">Image : </label>
            <input
              name="image"
              value={""}
              onChange={(e) => handleInput(e, "image")}
              type="file"
            />
          </div>
          <button type="submit">Modifier</button>
        </form>
      </div>
    </>
  );
};
export default ProductsUpdate;
