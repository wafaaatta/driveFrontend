import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductsCreate = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categories: [],
    image: "",
  });

  // const generateImage = (file) => {
  //   return URL.createObjectURL(file);
  // };

  // const deintegrateImage = (file) => {
  //   return URL.revokeObjectURL(file);
  // };
  const handleInput = async (e, type) => {
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
        if (e.target.checked) {
          setProduct((currentProduct) => {
            return {
              ...currentProduct,
              categories: [...currentProduct.categories, e.target.value],
            };
          });
        } else {
          setProduct((currentProduct) => ({
            ...currentProduct,
            categories: currentProduct.categories.filter(
              (category) => category !== e.target.value
            ),
          }));
        }
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

  console.log("Product => ", product);

  const navigate = useNavigate();

  const storeProduct = (e) => {
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
      "Content-Type": "multipart/form-data",
    };
    axios
      .post("http://127.0.0.1:8000/api/v1/products", data, { headers })
      .then((response) => {
        console.log(response);
        alert(response.data.message);
        navigate("/products");
        // cancello l'immagine precedentemente "creata" con generateImage();
        // deintegrateImage(product.image);
      });
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/v1/categories").then((response) => {
      console.log(response);
      setCategories(response.data.categories);
    });
  }, []);

  return (
    <>
      <div className="container-form">
        <h2>Ajouter un produit</h2>
        <form onSubmit={storeProduct} encType="multipart/form-data">
          <div>
            <label htmlFor="">Nom : </label>
            <br />
            <input
              name="name"
              value={product.name}
              onChange={(e) => handleInput(e, "name")}
              type="text"
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
            />
          </div>
          <div style={{ display: "flex" }}>
            {categories.map((category) => (
              <div key={category.id}>
                <label htmlFor="">{category.name} </label>
                <br />
                <input
                  onChange={(e) => handleInput(e, "checkbox")}
                  type="checkbox"
                  value={category.id}
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
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </>
  );
};
export default ProductsCreate;
