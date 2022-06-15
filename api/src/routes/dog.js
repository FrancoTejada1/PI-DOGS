const { Router } = require("express");
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Race, Temperaments } = require("../db.js");
const { Op } = require("sequelize");

const router = Router();

const urlApi = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`;

const getApi = async () => {
  const getUrlApi = await axios.get(urlApi);

  const info = await getUrlApi.data.map((d) => {
    return {
      id: d.id,
      name: d.name,
      img: d.image.url,
      temperaments: d.temperament,
      height: d.height.metric,
      weight: d.weight.metric,
      yearsOfLife: d.life_span,
    };
  });
  return info;
};

const getDB = async() => {
  return await Race.findAll({
    include: {
      model: Temperaments,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllInfo = async () => {
  const apiInfo = await getApi();
  const dBInfo = await getDB();
  const totalInfo = apiInfo.concat(dBInfo);
  return totalInfo;
};

router.get("/", async (req, res) => {
  const { name } = req.query;
  const races = await getAllInfo();

  try {
    if(name) {
      const raceOfDog = races.filter((r) => r.name.toLowerCase().includes(name.toLowerCase()));

      raceOfDog.length
      ? res.status(200).send(raceOfDog)
      : res.status(400).send("no se encontro esta raza");
    }
    else{
      res.status(200).send(races);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const races = await getAllInfo();

  try {
    if (id) {
      const findById = races.filter((r) => r.id == id);

      findById.length
        ? res.status(200).send(findById)
        : res.status(400).send("el id no se encontro");
    } else {
      null;
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const {
    id,
    name,
    image,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    yearsOfLifeMin,
    yearsOfLifeMax,
    createdInDB,
    temperaments,
  } = req.body;

  let height = `${heightMin} - ${heightMax}`;
  let weight = `${weightMin} - ${weightMax}`;
  let yearsOfLife = `${yearsOfLifeMin} - ${yearsOfLifeMax} years`;

  const newRace = await Race.create({
    id,
    name,
    image,
    height,
    weight,
    yearsOfLife,
    createdInDB,
  });

  const addTemps = await Temperaments.findAll({
    where: {
      name: temperaments,
    },
  });

  newRace.addTemperaments(addTemps);

  res.status(200).send("successfully created race");
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    await Race.destroy({
    where: {
      id: id,
    },
  })
  res.status(200).send("se elimino")
  } catch (error) {
    console.log(error)
  } 
});

module.exports = router;