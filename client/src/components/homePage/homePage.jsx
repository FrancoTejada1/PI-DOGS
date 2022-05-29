import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllRaces,
  getTemperaments,
  filterByTemperaments,
  filterByUploaded,
  sortByName,
  sortByWeight,
} from "../../redux/actions/index.js";
import Cards from "../cards/cards.jsx";
import Pagination from "../pagination/pagination.jsx";
import SearchBar from "../searchBar/searchBar.jsx";
import style from "./homePage.module.css";

export default function HomePage() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1); // pagina en la que se establece
  const [dogs] = useState(8); // 8 perros que se veran en la pagina
  const [order, setOrder] = useState("");

  const races = useSelector((state) => state.races);
  const temperaments = useSelector((state) => state.temperaments);

  const lastIndexOfDog = page * dogs;
  const firstIndexOfDog = lastIndexOfDog - dogs;
  const dogsByPages = races.slice(firstIndexOfDog, lastIndexOfDog);

  const pagination = (numberOfPage) => {
    setPage(numberOfPage);
  };

  useEffect(() => {
    dispatch(getAllRaces())
    dispatch(getTemperaments());
  }, [dispatch]);

  const handlerFilterByTemps = (e) => {
    dispatch(filterByTemperaments(e.target.value));
  };

  const handlerFilterByUploaded = (e) => {
    dispatch(filterByUploaded(e.target.value));
  };

  const handlerSortByName = (e) => {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  };

  const handlerSortByWeight = (e) => {
    e.preventDefault();
    dispatch(sortByWeight(e.target.value));
    setPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  };

  console.log(temperaments);

  return (
    <div className={style.bg_home}>
      <SearchBar />
      <div className={style.container_boton}>
        <Link to="/create">
          <button className={style.button_go_create}>Create Race</button>
        </Link>
      </div>
      <div className={style.header}>
        <select className={style.select} onChange={(e) => handlerFilterByTemps(e)}>
          <option value="All">All</option>
          {temperaments.map((d, i) => (
            <option key={i} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
        <select className={style.select} onChange={(e) => handlerFilterByUploaded(e)}>
          <option value="All">All</option>
          <option value="Created">Created</option>
          <option value="Api">Api</option>
        </select>
        <select className={style.select} onChange={(e) => handlerSortByName(e)}>
          <option value="Ascendent">Ascendent</option>
          <option value="Descendent">Descendent</option>
        </select>
        <select className={style.select} onChange={(e) => handlerSortByWeight(e)}>
          <option value="maxWeight">Max Weight</option>
          <option value="minWeight">Min Weight</option>
        </select>
      </div>
      <Pagination dogs={dogs} races={races.length} pagination={pagination} />
      <div>
        {dogsByPages?.map((r) => {
          return (
            <Cards
              key={r.key}
              id={r.id}
              img={r.img}
              name={r.name}
              weight={r.weight}
              temperaments={r.temperaments}
            />
          );
        })}
      </div>
    </div>
  );
}
