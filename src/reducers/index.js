import { combineReducers } from "redux";

const locationReducer = (location = [], action) => {
  if (action.type === "SET_LOCATIONS") {
    const noDuplicate = action.payload.filter(val => location.find(loc => loc.name == val.name) === undefined)
    console.log(location, action.payload, noDuplicate, 'inside reducer');
    return [...location, ...noDuplicate];
  }
  return location;
};

export default combineReducers({
  locations: locationReducer,
});
