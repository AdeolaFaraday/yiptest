import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { config } from "../config";
import { locationAction } from "../actions";
import UserMapShow from "./userMapShow";

const UserComponent = (props) => {
  const [cordinate, setCordinate] = useState('');

  useEffect(() => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((pos) => {
        const latlon = pos.coords.latitude + "," + pos.coords.longitude;
        setCordinate(latlon);
      });
    }
  }, []);

  return <UserMapShow lonlat={cordinate} />;
};

export default UserComponent;
