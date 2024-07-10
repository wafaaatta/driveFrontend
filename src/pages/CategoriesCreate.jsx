import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoriesCreate = () => {
  const [category, setCategory] = useState({
    name: "",
  });

  const handleInput = async (e) => {
    e.persist();
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const storeCategory = (e) => {
    e.preventDefault();
    const data = {
      name: category.name,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("http://127.0.0.1:8000/api/v1/categories", data, { headers })
      .then((response) => {
        setCategory(response.data);
        alert(response.data.message);
        navigate("/categories");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="container-form">
        <h2>Ajouter une categorie</h2>
        <form onSubmit={storeCategory}>
          <div className="inputLabel">
            <label htmlFor="">Nom categorie :</label>
            <input
              required
              type="text"
              value={category.name}
              onChange={(e) => handleInput(e)}
              name="name"
            />
          </div>
          <div>
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default CategoriesCreate;
