import React from "react";
import style from "./pagination.module.css";

export default function Pagination({ races, dogs, pagination }) {
  const numberOfPages = [];

  const numbers = Math.ceil(races / dogs);

  for (let i = 1; i <= numbers; i++) {
    numberOfPages.push(i);
  }

  var key = 1;

  return (
    <div className={style.pagination}>
      <ul className={style.ul_pagination}>
        {numberOfPages?.map((n) => {
          return (
            <li key={key++}>
              <div className={style.listas}>
                <button onClick={() => pagination(n)}>{n}</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
