import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getTemperaments, postRaces } from "../../redux/actions/index.js";
import style from "./createPage.module.css";

const validation = (dogs) => {
  var errors = {};

  if (!dogs.name.trim()) {
    errors.name = "Require name";
  } else if (!dogs.height) {
    errors.height = "Require height";
  } else if (!dogs.weight) {
    errors.weight = "Require weight";
  }
  return errors;
};

export default function CreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const temperaments = useSelector((state) => state.temperaments);

  const [race, setRaces] = useState({
    name: "",
    height: "",
    weight: "",
    yearsOfLife: "",
    temperaments: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handlerChange = (e) => {
    setRaces({
      ...race,
      [e.target.name]: e.target.value,
    });
  };

  const handlerSelect = (e) => {
    setRaces({
      ...race,
      temperaments: [...race.temperaments, e.target.value],
    });
  };

  const handlerBlur = (e) => {
    /* handlerChange(e);
    handlerSelect(e);
    setErrors(validation(errors)); */
  };
  
  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log(race);
    dispatch(postRaces(race));
    alert("successfully created race");
    setRaces({
      name: "",
      height: "",
      weight: "",
      yearsOfLife: "",
      temperaments: [],
    });
    navigate("/dogs");
  };

  return (
    <div className={style.bg_create}>
      <Link to="/dogs">
        <button className={style.bt_back_create}>Back</button>
      </Link>
      <div>
        <h1 className={style.title_create}>Create your Race</h1>
      </div>
      <div className={style.inputs}>
        <form onSubmit={(e) => handlerSubmit(e)}>
          <div>
            <label className={style.label}>Name: </label>
            <input 
              className={style.input}
              type="text"
              name="name"
              value={race.name}
              placeholder="Name of race..."
              onBlur={(e) => handlerBlur(e)}
              onChange={(e) => handlerChange(e)}
            />
          </div>
          <div>
            <label className={style.label}>Height: </label>
            <input
              className={style.input}
              type="text"
              name="height"
              value={race.height}
              placeholder="20 - 30..."
              onBlur={(e) => handlerBlur(e)}
              onChange={(e) => handlerChange(e)}
            />
          </div>
          <div>
            <label className={style.label}>Weight: </label>
            <input
              className={style.input}
              type="text"
              name="weight"
              value={race.weight}
              placeholder="4 - 7..."
              onBlur={(e) => handlerBlur(e)}
              onChange={(e) => handlerChange(e)}
            />
          </div>
          <div>
            <label className={style.label}>Years of Life: </label>
            <input
              className={style.input}
              type="text"
              name="yearsOfLife"
              value={race.yearsOfLife}
              placeholder="10 years..."
              onChange={(e) => handlerChange(e)}
            />
          </div>
          <div>
            <label className={style.label}>Temperaments: </label>
            <select className={style.select} onChange={(e) => handlerSelect(e)}>
              {temperaments?.map((t, i) => {
                return <option key={i}>{t.name}</option>;
              })}
            </select>
          </div>
          <p className={style.temps_concats}>{race.temperaments?.map((d) => `${d}, `)}</p>
          <div>
            <button className={style.bt_create} type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
