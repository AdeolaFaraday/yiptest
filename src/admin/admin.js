import React, { useEffect } from "react";
import { connect } from "react-redux";
import { adminLocationAction, locationAction } from "../actions";
import { socketExport } from "../login/login";
import "./admin.css";
import MapShow from "./map-show";

const AdminDashboard = (props) => {
  useEffect(() => {
    socketExport.on("onlineUsers", ({ onlineUsers }) => {
      console.log(onlineUsers);
      props.adminLocationAction(onlineUsers);
    });
    return () => {
      socketExport.off();
      props.history.push("/");
    };
  }, []);

  console.log(props);
  if (props.locations === null) {
    return <div>Loading...</div>;
  }
  return (
    <section>
      <div>
        <h3 className="heading">AdminDashboard</h3>
      </div>
      <div className="body">
        {props.locations.map((loc) => (
          <MapShow lonlat={loc} />
        ))}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return { locations: state.locations };
};

export default connect(mapStateToProps, {
  adminLocationAction,
  locationAction,
})(AdminDashboard);
