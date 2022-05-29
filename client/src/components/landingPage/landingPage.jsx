import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={style.landing}>
      <div className={style.bg_text}>
        <h1>welcome to the dog clinic</h1>
        <div>
          <Link to="/dogs">
            <button className={style.boton}>ENTER</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
