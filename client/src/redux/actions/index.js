import axios from "axios";

export const GET_ALL_RACES = "GET_ALL_RACES";
export const GET_RACE_BY_NAME = "GET_RACE_BY_NAME";
export const GET_RACE_BY_ID = "GET_RACE_BY_ID";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const POST_RACES = "POST_RACES";
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
export const FILTER_BY_UPLOADED = "FILTER_BY_UPLOADED";
export const SORT_BY_NAME = "SORT_BY_NAME";
export const SORT_BY_WEIGHT = "SORT_BY_WEIGHT";


export function getAllRaces() {
  return function (dispatch) {
    axios.get(`http://localhost:3001/dogs`)
    .then((json) => {
        dispatch({
          type: GET_ALL_RACES,
          payload: json.data,
        });
    })
    .catch((error) => {
        console.log(error);
    });
  };
};

export function raceByName(name) {
  return function (dispatch) {
    axios.get(`http://localhost:3001/dogs?name=${name}`)
    .then((json) => {
        dispatch({
          type: GET_RACE_BY_NAME,
          payload: json.data,
        });
    })
    .catch((error) => {
        console.log(error);
    });
  };
};

export function raceById(id) {
  return function (dispatch) {
    axios.get(`http://localhost:3001/dogs/${id}`)
    
    .then((json) => {
      console.log(json.data[0])
        dispatch({
            type: GET_RACE_BY_ID,
            payload: json.data[0],
        });
    })
    .catch((error) => {
        console.log(error);
    });
  };
};

export function getTemperaments() {
  return function (dispatch) {
    axios.get(`http://localhost:3001/temperaments`)
    .then((json) => {
      dispatch({
        type: GET_TEMPERAMENTS,
        payload: json.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  };
};

export function postRaces(payload) {
  return function (dispatch) {
    axios.post(`http://localhost:3001/dogs`, payload)
    .then((json) => {
      return json
    })
    .catch((error) => {
      console.log(error)
    })
  };
};

export function filterByTemperaments(payload) {
  return {
    type: FILTER_BY_TEMPERAMENTS,
    payload: payload
  }
};

export function filterByUploaded(payload) {
  return {
    type: FILTER_BY_UPLOADED,
    payload: payload
  }
};

export function sortByName(payload) {
  return {
    type: SORT_BY_NAME,
    payload: payload
  }
};

export function sortByWeight(payload) {
  return {
    type: SORT_BY_WEIGHT,
    payload: payload
  }
};
