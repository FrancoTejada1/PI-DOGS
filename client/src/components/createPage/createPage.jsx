import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getTemperaments, postRaces } from "../../redux/actions/index.js";
import style from "./createPage.module.css";

const validation = (race) => {
  let errors = {};

  if (!race.name.trim()) {
    errors.name = "Name is required";
  } else if (!race.height) {
    errors.height = "Height is required with the format";
  } else if (!race.weight) {
    errors.weight = "Weight is required with the format";
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
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleChange = (e) => {// para que detecte cuando estamos escribiendo y haga el cambio de los valores
    setRaces({
      ...race,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e) => {// para que detecte cuando seleccionamos y haga el cambio de valores
    setRaces({
      ...race,
      temperaments: [...race.temperaments, e.target.value],
    });
  };

  const handleBlur = (e) => {// aqui es donde se haran las validaciones y este mismo las lance
    handleChange(e);
    setErrors(validation(race));// la funcion validation va a funcionar dentro de la variable de estado de los errores
                                //  y validara las variables del formulario
  };
  
  const handleSubmit = (e) => {
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
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label className={style.label}>Name: </label>
            <input 
              className={style.input}
              type="text"
              name="name"
              value={race.name}
              placeholder="Name of race..."
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChange(e)}
              required
            />
            {errors.name && <p className={style.errors}>{errors.name}</p> }
          </div>
          <div>
            <label className={style.label}>Height: </label>
            <input
              className={style.input}
              type="text"
              name="height"
              value={race.height}
              placeholder="20 - 30..."
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChange(e)}
              required
            />
            {errors.height && <p className={style.errors}>{errors.height}</p>}
          </div>
          <div>
            <label className={style.label}>Weight: </label>
            <input
              className={style.input}
              type="text"
              name="weight"
              value={race.weight}
              placeholder="4 - 7..."
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChange(e)}
              required
            />
            {errors.weight && <p className={style.errors}>{errors.weight}</p>}
          </div>
          <div>
            <label className={style.label}>Years of Life: </label>
            <input
              className={style.input}
              type="text"
              name="yearsOfLife"
              value={race.yearsOfLife}
              placeholder="10 years..."
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className={style.label}>Temperaments: </label>
            <select className={style.select} onChange={(e) => handleSelect(e)}>
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
