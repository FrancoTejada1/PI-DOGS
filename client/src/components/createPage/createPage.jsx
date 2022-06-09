import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getTemperaments, postRaces } from "../../redux/actions/index.js";
import style from "./createPage.module.css";

const validation = (race) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexHeightMin = /^\d*$/;
  let regexHeightMax = /^\d*$/;
  let regexWeightMin = /^\d*$/;
  let regexWeightMax = /^\d*$/;
  let regexYearsMin = /^\d*$/;
  let regexYearsMax = /^\d*$/;

  if (!race.name.trim()) {
    errors.name = "Name is required";
  } else if (!regexName.test(race.name.trim())) {
    errors.name = "Name only accepts letters and blanks";
  }

  if (!race.heightMin.trim()) {
    errors.heightMin = "Height Min is required with the format";
  } else if (!regexHeightMin.test(race.heightMin.trim())) {
    errors.heightMin = "Height only accepts integers and positive numbers";
  } else if (parseInt(race.heightMin.trim()) < 1) {
    errors.heightMin = "the number must be greater than or equal to 1";
  } else if (parseInt(race.heightMin.trim()) >= parseInt(race.heightMax.trim())) {
    errors.heightMin = "the minimum value of the height must be less than the maximum";
  }

  if (!race.heightMax.trim()) {
    errors.heightMax = "Height Max is required with the format";
  } else if (!regexHeightMax.test(race.heightMax.trim())) {
    errors.heightMax = "Height only accepts integers and positive numbers";
  } else if (parseInt(race.heightMax.trim()) > 100) {
    errors.heightMax = "The number must be less than or equal to 100";
  } else if (parseInt(race.heightMax.trim()) <= parseInt(race.heightMin.trim())) {
    errors.heightMax = "the maximum value of the height must be greater than the minimum";
  }

  if (!race.weightMin.trim()) {
    errors.weightMin = "Weight Min is required with the format";
  } else if (!regexWeightMin.test(race.weightMin.trim())) {
    errors.weightMin = "Weight only accepts integers and positive numbers";
  } else if (parseInt(race.weightMin.trim()) < 1) {
    errors.weightMin = "the number must be greater than or equal to 1";
  } else if (parseInt(race.weightMin.trim()) >= parseInt(race.weightMax.trim())) {
    errors.weightMin = "the minimum value of the weight must be less than the maximum";
  }

  if (!race.weightMax.trim()) {
    errors.weightMax = "Weight Max is required with the format";
  } else if (!regexWeightMax.test(race.weightMax.trim())) {
    errors.weightMax = "Weight only accepts integers and positive numbers";
  } else if (parseInt(race.weightMax.trim()) > 82) {
    errors.weightMax = "The number must be less than or equal to 82";
  } else if (parseInt(race.weightMax.trim()) <= parseInt(race.weightMin.trim())) {
    errors.weightMax = "the maximum value of the weight must be greater than the minimum";
  }

  if (!race.yearsOfLifeMin.trim()) {
    errors.yearsOfLifeMin = "Year Min is required";
  } else if (!regexYearsMin.test(race.yearsOfLifeMin.trim())) {
    errors.yearsOfLifeMin = "Only accepts positive integers";
  } else if (parseInt(race.yearsOfLifeMin.trim()) < 1) {
    errors.yearsOfLifeMin = "the number must be greater than or equal to 1";
  } else if (parseInt(race.yearsOfLifeMin.trim()) >= parseInt(race.yearsOfLifeMax.trim())) {
    errors.yearsOfLifeMin = "the minimum value of the age must be less than the maximum";
  }

  if (!race.yearsOfLifeMax.trim()) {
    errors.yearsOfLifeMax = "Year Max is required";
  } else if (!regexYearsMax.test(race.yearsOfLifeMax.trim())) {
    errors.yearsOfLifeMax = "Only accepts positive integers";
  } else if (parseInt(race.yearsOfLifeMax.trim()) > 18) {
    errors.yearsOfLifeMax = "The number must be less than or equal to 18";
  } else if (parseInt(race.yearsOfLifeMax.trim()) <= parseInt(race.yearsOfLifeMin.trim())) {
    errors.yearsOfLifeMax ="the maximun value of the age must be greater than the minimum";
  }

  if(!race.temperaments.length) {
    errors.temperaments = "minimal temperament is needed"
  }

  return errors;
};

export default function CreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const temperaments = useSelector((state) => state.temperaments);

  const [race, setRaces] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    yearsOfLifeMin: "",
    yearsOfLifeMax: "",
    temperaments: [],
  });

  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(false);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleChange = (e) => {
    // para que detecte cuando estamos escribiendo y haga el cambio de los valores
    setRaces({
      ...race,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e) => {
    // para que detecte cuando seleccionamos y haga el cambio de valores
    setRaces({
      ...race,
      temperaments: [...race.temperaments,e.target.value],
    });
  };

  const handleBlur = (e) => {
    // aqui es donde se haran las validaciones y este mismo las lance
    handleChange(e);
    setErrors(validation(race)); // la funcion validation va a funcionar dentro de la variable de estado de los errores y validara las variables del formulario
  };

  const handleDelete = (e) => {
    setRaces({
      ...race,
      temperaments: race.temperaments.reduce((acc, item) => {
        if (!acc.includes(item)) {
          acc.push(item);
        }
        return acc;
      },[])
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validation(race));
    setResponse(true)
    console.log(race);
    if (Object.keys(errors).length !== 0) {
      alert("Complete the required fields");
    } else if (response === false) {
      alert("You have to complete the form");
    } else {
      setResponse(true)
      dispatch(postRaces(race));
      alert("successfully created race");
      setRaces({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        yearsOfLifeMin: "",
        yearsOfLifeMax: "",
        temperaments: [],
      });
      navigate("/dogs");
    }
  };

  console.log(temperaments)

  return (
    <div className={style.bg_create}>
      <Link to="/dogs">
        <button className={style.bt_back_create}>Back</button>
      </Link>
      <div className={style.wrapper}>
        <div>
          <h1 className={style.title_create}>Create your Race</h1>
        </div>

        <div className={style.form}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <p>
              <label className={style.label}>Name: </label>
              <input
                className={style.input}
                type="text"
                name="name"
                value={race.name}
                placeholder="Name of race..."
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleChange(e)}
              />
              {errors.name && <p className={style.errors}>{errors.name}</p>}
            </p>
            <p>
              <label className={style.label}>Height Min: </label>
              <input
                className={style.input}
                type="text"
                name="heightMin"
                value={race.heightMin}
                placeholder="20..."
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleChange(e)}
              />
              {errors.heightMin && (
                <p className={style.errors}>{errors.heightMin}</p>
              )}
            </p>
            <p>
              <label className={style.label}>Height Max: </label>
              <input
                className={style.input}
                type="text"
                name="heightMax"
                value={race.heightMax}
                placeholder="30..."
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleChange(e)}
              />
              {errors.heightMax && (
                <p className={style.errors}>{errors.heightMax}</p>
              )}
            </p>
            <p>
              <label className={style.label}>Weight Min: </label>
              <input
                className={style.input}
                type="text"
                name="weightMin"
                value={race.weightMin}
                placeholder="20..."
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleChange(e)}
              />
              {errors.weightMin && (
                <p className={style.errors}>{errors.weightMin}</p>
              )}
            </p>
            <p>
              <label className={style.label}>Weight Max: </label>
              <input
                className={style.input}
                type="text"
                name="weightMax"
                value={race.weightMax}
                placeholder="30..."
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleChange(e)}
              />
              {errors.weightMax && (
                <p className={style.errors}>{errors.weightMax}</p>
              )}
            </p>
            <p>
              <label className={style.label}>Years of Life Min: </label>
              <input
                className={style.input}
                type="text"
                name="yearsOfLifeMin"
                value={race.yearsOfLifeMin}
                placeholder="1..."
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleChange(e)}
              />
              {errors.yearsOfLifeMin && (
                <p className={style.errors}>{errors.yearsOfLifeMin}</p>
              )}
            </p>
            <p>
              <label className={style.label}>Years of Life Max: </label>
              <input
                className={style.input}
                type="text"
                name="yearsOfLifeMax"
                value={race.yearsOfLifeMax}
                placeholder="18..."
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleChange(e)}
              />
              {errors.yearsOfLifeMax && (
                <p className={style.errors}>{errors.yearsOfLifeMax}</p>
              )}
            </p>
            <p className={style.full_width}>
              <label className={style.label}>Temperaments: </label>
              <select
                className={style.select}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleSelect(e)}
              >
                {temperaments?.map((t, i) => {
                  return <option key={i}>{t.name}</option>;
                })}
              </select>
              {errors.temperaments && <p className={style.errors}>{errors.temperaments}</p>}
            </p>
            
            {race.temperaments?.map((d, i) => 
            <div className={style.temps_concats}>
              <p>{d}</p>
            <button onClick={(e) => handleDelete(e)}>x</button>
            </div>
            )}
            <div className={style.boton}>
              <button className={style.bt_create} type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
