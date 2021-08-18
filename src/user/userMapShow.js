import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { config } from "../config";
import "./userShow.css";

const UserMapShow = (props) => {
  const { lonlat } = props;
  const [location, setLocaction] = useState({
    address: "",
    deviceName: "",
  });
  const map = useRef(null);
  useEffect(() => {
    if (props.lonlat) {
      showPosition();
    }
  }, [props.lonlat]);

  console.log(props);

  const showPosition = () => {
    console.log(lonlat, "dsjncdio");
    const cordinate = lonlat;
    console.log(cordinate, props);
    const img_url = `https://maps.googleapis.com/maps/api/staticmap?center=${cordinate}&markers=color:blue%7Clabel:S%7C11211%7C11206%7C11222&zoom=13&size=400x300&sensor=true&key=${config.API_KEY}`;
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
  return (
    <section>
      <h3 className="heading">User Dashboard</h3>
      <p className="heading">Formatted Address</p>
      <div class="container">
        <div class="phone-image">
          <img src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YW5kcm9pZCUyMHBob25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"></img>
        </div>
        <div ref={map} class="location-info"></div>
      </div>
    </section>
  );
};

export default UserMapShow;
