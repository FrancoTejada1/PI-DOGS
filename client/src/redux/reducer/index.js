import {
  GET_ALL_RACES,
  GET_RACE_BY_ID,
  GET_RACE_BY_NAME,
  GET_TEMPERAMENTS,
  POST_RACES,
  FILTER_BY_TEMPERAMENTS,
  FILTER_BY_UPLOADED,
  SORT_BY_NAME,
  SORT_BY_WEIGHT,
  DELETE_RACE
} from "../actions/index.js";

const initialState = {
  races: [],
  copyOfRaces: [],
  details: [],
  temperaments: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RACES:
      return {
        ...state,
        races: action.payload,
        copyOfRaces: action.payload,
      };
    case GET_RACE_BY_NAME:
      return {
        ...state,
        races: action.payload,
      };
    case GET_RACE_BY_ID:
      return {
        ...state,
        details: action.payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case POST_RACES:
      return {
        ...state,
      };
    case FILTER_BY_TEMPERAMENTS:
      const allTemperaments = state.copyOfRaces;
      const temperaments =
        action.payload === "All"
          ? allTemperaments
          : allTemperaments.filter((t) => {
              if (t.temperaments) {
                if (t.temperaments.includes(action.payload)) {
                  return t;
                }
              }
            });
      return {
        ...state,
        races: temperaments,
      };
    case FILTER_BY_UPLOADED:
      const allRaces = state.copyOfRaces;
      const racesUploaded =
        action.payload === "Created"
          ? allRaces.filter((r) => r.createdInDB)
          : allRaces.filter((r) => !r.createdInDB);
      return {
        ...state,
        races: action.payload === "All" ? allRaces : racesUploaded,
      };
    case SORT_BY_NAME:
      const sortName = action.payload === "Ascendent"
      ? state.races.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
            return -1;
          } else {
              return 0;
            }
      })
      : state.races.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        } else if (a.name < b.name) {
            return 1;
          } else {
              return 0;
            }
      });
      return {
        ...state,
        copyOfRaces: sortName,
      };
    case SORT_BY_WEIGHT:
      let data = state.races;
      data = data.filter((d) => d.weight.split("-")[0] !== "NaN");
      let sortWeight = action.payload === "Ascendent"
        ? data.sort((a, b) => {
            if (parseInt(a.weight.split("-")[0], 10) > parseInt(b.weight.split("-")[0], 10)){
              return 1;
            }
            else if (parseInt(a.weight.split("-")[0], 10) < parseInt(b.weight.split("-")[0], 10)){
              return -1;
            }
            else if(parseInt(a.weight.split("-")[0], 10) === parseInt(b.weight.split("-")[0], 10)){
              if(parseInt(a.weight.split("-")[1], 10) > parseInt(b.weight.split("-")[1], 10)) {
                return 1
              } 
              else if(parseInt(a.weight.split("-")[1], 10) < parseInt(b.weight.split("-")[1], 10)) {
                return -1
              }
            }
            else {
              return 0;
            }
          })
        : data.sort((a, b) => {
            if (parseInt(a.weight.split("-")[0], 10) > parseInt(b.weight.split("-")[0], 10)){
              return -1;
            }
            else if (parseInt(a.weight.split("-")[0], 10) < parseInt(b.weight.split("-")[0], 10)){
              return 1;
            }
            else if(parseInt(a.weight.split("-")[0], 10) === parseInt(b.weight.split("-")[0], 10)){
              if(parseInt(a.weight.split("-")[1], 10) > parseInt(b.weight.split("-")[1], 10)) {
                return -1
              } 
              else if(parseInt(a.weight.split("-")[1], 10) < parseInt(b.weight.split("-")[1], 10)) {
                return 1
              }
            }
            else {
              return 0;
            }
          });
      return {
        ...state,
        races: sortWeight,
        copyOfRaces: sortWeight,
      };
    case DELETE_RACE:
      let data3 = state.races;
      let deleteById = [];
      let id = action.payload
      ? deleteById = data3.filter((d) => d.id !== id) : null;
    return {
      ...state,
      races: deleteById,
      copyOfRaces: deleteById
    }  
    default:
      return state;
  }
};

export default rootReducer;
