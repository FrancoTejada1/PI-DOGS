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

  console.log(allDetails?.map((t) => t.temperaments[0]));

  return (
    <div className={style.bg_details}>
      <div>
        <Link className={style.a_back_details} to="/dogs">
          <button className={style.boton}>Back</button>
        </Link>
      </div>
      <img src={allDetails?.map((d) => d.img)} alt="" />
      <h1>{allDetails?.map((d) => d.name)}</h1>
      <h2>
        {allDetails?.map((t) => t.temperaments)
          ? allDetails?.map((t) => t.temperaments)
         : null 
        }
      </h2>
      <h3>Height: {allDetails?.map((d) => d.height)}</h3>
      <h3>Weight: {allDetails?.map((d) => d.weight)}</h3>
      <h3>Years of Life: {allDetails?.map((d) => d.yearsOfLife)}</h3>
    </div>
  );
}
