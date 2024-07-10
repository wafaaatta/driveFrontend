import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoriesUpdate = () => {
  const [category, setCategory] = useState({});
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/categories/${id}`)
      .then((response) => {
        console.log(response.data.category.name);
        setCategory(response.data.category);
      });
  }, [id]);

  const handleInput = (e) => {
    e.persist();
    setCategory({ ...category, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const updateCategory = (e) => {
    e.preventDefault();

    const data = {
      name: category.name,
    };

    axios
      .put(`http://127.0.0.1:8000/api/v1/categories/${id}`, data)
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
        <h2>Modifier la categorie</h2>
        <form onSubmit={updateCategory}>
          <div className="inputLabel">
            <label htmlFor="">Nom categorie :</label>
            <input
              required
              type="text"
              value={category.name || ""}
              onChange={handleInput}
              name="name"
            />
          </div>
          <div>
            <button type="submit">Modifier</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default CategoriesUpdate;
