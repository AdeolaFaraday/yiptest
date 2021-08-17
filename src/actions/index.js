import { socketExport } from "../login/login";

export const locationAction = (location) => {
  console.log(socketExport);
  // Return an action
  socketExport.emit("addUser", { location });
  return {
    type: "LOCATION_LNGLAT",
    payload: location,
  };
};

export const adminLocationAction = (locations) => {
  console.log(socketExport);
  // Return an action
  return {
    type: "SET_LOCATIONS",
    payload: locations,
  };
};
