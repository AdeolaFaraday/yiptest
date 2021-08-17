import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { connect } from "react-redux";
import { locationAction } from "../actions";
import { io } from "socket.io-client";
import { bindActionCreators } from "redux";

let socket = io("ws://localhost:8000/");

const Login = (props) => {
  const [name, setName] = useState("");
  const [cordinate, setCordinate] = useState("");

  useEffect(() => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((pos) => {
        const latlon = pos.coords.latitude + "," + pos.coords.longitude;
        props.locationAction([latlon]);
        setCordinate(latlon);
      });
    }
    // return () => {
    //   socketExport.off();
    //   props.history.push("/");
    // };
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleAdmin = () => {
    if (name !== "admin") {
      window.alert("you are not authorized to login in as admin");
      return;
    }
    socket.emit("addUser", { name, location: cordinate });
    props.history.push("/admin");
  };

  // const getLocation = () => {
  //   if (window.navigator.geolocation) {
  //     window.navigator.geolocation.getCurrentPosition(showPosition);
  //   } else {
  //     return false;
  //   }
  // };
  // const showPosition = (position) => {
  //   const latlon = position.coords.latitude + "," + position.coords.longitude;
  //   props.locationAction([latlon]);
  //   console.log(latlon, props);
  //   // const img_url = `https://maps.googleapis.com/maps/api/staticmap?center=${latlon}&zoom=14&size=400x300&sensor=true&key=${config.API_KEY}`;
  //   // // const img_url =
  //   // //   "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvbmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
  //   // map.current.innerHTML = `<img src=${img_url}>`;
  //   // const location = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlon}&key=${config.API_KEY}`;

  //   // axios
  //   //   .get(location)
  //   //   .then((res) => {
  //   //     console.log(res);
  //   //     setLocaction({
  //   //       ...location,
  //   //       deviceName: window.navigator.userAgent,
  //   //       address: res.data.results[0].formatted_address,
  //   //     });
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });
  // };

  const handleStaff = () => {
    console.log(cordinate);
    if (!name) {
      window.alert("please enter a name");
      return;
    }
    socket.emit("addUser", { name, location: cordinate });
    props.history.push("/staff");
  };

  return (
    <section>
      <div className="login-component">
        <div>
          <input
            type="text"
            onChange={handleChange}
            className="form-input"
            placeholder="Your name"
          />
          <button onClick={handleAdmin}>Login As Admin</button>
          <button onClick={handleStaff}>Login As Staff</button>
        </div>
      </div>
    </section>
  );
};

export const socketExport = socket;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ locationAction }, dispatch);
}

export default connect(null, mapDispatchToProps)(Login);
