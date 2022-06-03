import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { raceById } from "../../redux/actions";
import style from "./detailsPage.module.css";

export default function DetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const allDetails = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(raceById(id));
  }, [dispatch, id]);

  console.log(allDetails)

  return (
    <div className={style.bg_details}>
      {allDetails &&
      (typeof allDetails.id === "number"
        ? allDetails.id === Number(id)
        : allDetails.id === id) ? (
        <div className={style.details}>
          <Link className={style.a_back_details} to="/dogs">
            <button className={style.boton}>Back</button>
          </Link>
          {allDetails.img ? (
            <div className={style.with_img}>
              <img className={style.img_holder} src={allDetails.img} alt="" />
              <div className={style.info}>
                <h1 className={style.title}>{allDetails.name}</h1>
                <ul>
                  <li>
                  {allDetails.temperaments
                    ? typeof allDetails.temperaments !== "string"
                      ? allDetails.temperaments.map((d) => d.name).length > 1 ? allDetails.temperaments.map((d) => `${d.name}, `) : allDetails.temperaments.map((d) => d.name)
                      : allDetails.temperaments
                    : null}
                  </li>
                </ul>
                <h3 className={style.height}>Height: {allDetails.height} cm</h3>
                <h3 className={style.weight}>Weight: {allDetails.weight} kg</h3>
                <h3 className={style.years}>Years of Life: {allDetails.yearsOfLife}</h3>
              </div>
            </div>
          ) : (
            <div className={style.without_img}>
              <h1>{allDetails.name}</h1>
              <h2>
                {allDetails.temperaments
                  ? typeof allDetails.temperaments !== "string"
                    ? allDetails.temperaments.map((d) => d.name).length > 1 ? allDetails.temperaments.map((d) => `${d.name}, `) : allDetails.temperaments.map((d) => d.name)
                    : allDetails.temperaments
                  : null}
              </h2>
              <h3>Height: {allDetails.height} cm</h3>
              <h3>Weight: {allDetails.weight} kg</h3>
              <h3>Years of Life: {allDetails.yearsOfLife}</h3>
            </div>
          )}
        </div>
      ) : (
        <img
          className={style.loading}
          src="https://c.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
          alt=" "
        />
      )}
    </div>
  );
}
