const { Router } = require("express");
const axios = require("axios");
const { Temperaments } = require("../db.js");
const { YOUR_API_KEY } = process.env;

const router = Router();

const url = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`;

const getTemperaments = async () => {
  const getUrl = await axios.get(url);

  var temperament = [];

  getUrl.data.map((d) => {
    temperament.push(d.temperament);
  });
  let data = temperament.toString().split(", ");

  let data2 = data.map((t) => t.split(","));
  data2 = data2.toString().split(",");

  const result = data2.reduce((acc, item) => {
    if (!acc.includes(item)) {
      acc.push(item);
    }
    return acc;
  }, []);

  const remove = result.filter((el) => el != "");

  return remove;
};

router.get("/", async (req, res) => {
  const temperaments = await getTemperaments();
  console.log(temperaments)

  try {
    let temperamentsInDB = await Temperaments.findAll();

    if (!temperamentsInDB.length) {
      temperaments.forEach((t) =>
        Temperaments.findOrCreate({
          where: {
            name: t
          }
        })
      );
      res.status(200).send("temperaments added");
    } else {
      res.status(200).send(temperamentsInDB);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
