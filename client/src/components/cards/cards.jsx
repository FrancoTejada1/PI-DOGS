import React from "react";
import { Link } from "react-router-dom";
import style from "./cards.module.css";

export default function Cards({ id, img, name, temperaments, weight,height }) {
  var key = 1;

  return (
    <div className={style.conteiner_card}>
      <div className={style.card}>
        <Link className={style.a_card} to={`/dogs/${id}`}>
          <img className={style.img_holder} src={img} alt="" />
          <h1 className={style.title}>{name}</h1>
          <div className={style.temps}>
            <p key={key++}>
              {temperaments
                ? typeof temperaments !== "string"
                  ? temperaments.length > 1
                    ? temperaments.map((t) => `${t.name}, `)
                    : temperaments?.map((t) => t.name)
                  : temperaments
                : null}
            </p>
            <h4 className={style.weight}>weight: {/* weight === "NaN" || weight === null ? weight === 0 :  */weight}</h4>
            <h4 className={style.weight}>height: {height}</h4>
          </div>
        </Link>
      </div>
    </div>
  );
}
