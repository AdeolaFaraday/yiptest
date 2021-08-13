import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { config } from "./config";

const App = () => {
  const [location, setLocaction] = useState({
    address: "",
    deviceName: "",
  });
  const map = useRef(null);
  useEffect(() => {
    getLocation();
  }, []);

  function getLocation() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.watchPosition(showPosition);
    } else {
      return false;
    }
  }

  function showPosition(position) {
    const latlon = position.coords.latitude + "," + position.coords.longitude;
    const img_url = `https://maps.googleapis.com/maps/api/staticmap?center=${latlon}&zoom=14&size=400x300&sensor=true&key=${config.API_KEY}`;
    // const img_url =
    //   "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvbmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
    map.current.innerHTML = `<img src=${img_url}>`;
    const location = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlon}&key=${config.API_KEY}`;

    axios
      .get(location)
      .then((res) => {
        console.log(res.data.results[0].formatted_address);
        setLocaction({
          ...location,
          deviceName: window.navigator.userAgent,
          address: res.data.results[0].formatted_address,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section>
      <div className="body">
        <div className="container">
          <div className="phone-image">
            <img src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YW5kcm9pZCUyMHBob25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"></img>
          </div>
          <div className="location-info">
            <div ref={map}></div>
            <h3>Formatted Address: {location.address}</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
