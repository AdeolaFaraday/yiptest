import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { config } from "../config";

const MapShow = (props) => {
  const { lonlat } = props;
  const [location, setLocaction] = useState({
    address: "",
    deviceName: "",
  });

  const map = useRef(null);
  useEffect(() => {
    showPosition();
  }, []);

  const showPosition = () => {
    const cordinate = lonlat.location;
    console.log(cordinate, props);
    const img_url = `https://maps.googleapis.com/maps/api/staticmap?center=${cordinate}&markers=color:blue%7Clabel:S%7C11211%7C11206%7C11222&zoom=16&size=400x300&sensor=true&key=${config.API_KEY}`;
    // const img_url =
    //   "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvbmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
    map.current.innerHTML = `<img class="map-image" src=${img_url}>`;
    const location = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${cordinate}&key=${config.API_KEY}`;

    axios
      .get(location)
      .then((res) => {
        console.log(res);
        setLocaction({
          ...location,
          deviceName: window.navigator.userAgent,
          address: res.data.results[0].formatted_address,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(lonlat.name);
  return (
    <>
      <div className="user-info">
        <p>Address: {location.address}</p>
        <p>Name: {lonlat.name}</p>
      </div>
      <div className="body">
        <div className="container">
          <div className="phone-image">
            <img src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YW5kcm9pZCUyMHBob25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"></img>
          </div>
          <div ref={map} className="location-info"></div>
        </div>
      </div>
    </>
  );
};

export default MapShow;
