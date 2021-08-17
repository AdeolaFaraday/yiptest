import { combineReducers } from "redux";

const locationReducer = (location = [], action) => {
  if (action.type === "SET_LOCATIONS") {
    return [...location, ...action.payload];
  }
  return location;
};

export default combineReducers({
  locations: locationReducer,
});
