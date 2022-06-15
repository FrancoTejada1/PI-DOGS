import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { raceByName } from "../../redux/actions/index.js";
import style from "./searchBar.module.css";

export default function SearchBar({setPage}) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handlerInput = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  };

  const handlerSubmit = (e) => {
      e.preventDefault();
      dispatch(raceByName(name));
      setPage(1)
  }

  return (
    <div className={style.searchBar}>
      <input className={style.search} type="text" value={name} placeholder="search names..." onChange={(e) => handlerInput(e)}/>
      <button className={style.submit} type="submit" onClick={(e) => handlerSubmit(e)}>search</button>
    </div>
  );
};
