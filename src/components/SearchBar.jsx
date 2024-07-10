import { useEffect, useState } from "react";
import axios from "axios";

// const person = {
//   name: "salah",
//   age: 23,
// };
// person.name;
// console.log(name);
// const { name, age } = person;
// console.log(name);

const SearchBar = ({ value, setValue }) => {
  return (
    <>
      <input
        name="searchBar"
        className="searchBar"
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

export default SearchBar;