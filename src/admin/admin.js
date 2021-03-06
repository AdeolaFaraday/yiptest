import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { adminLocationAction, locationAction } from "../actions";
import { socketExport } from "../login/login";
import "./admin.css";
import MapShow from "./map-show";

const AdminDashboard = (props) => {
  useEffect(() => {
    socketExport.emit("getUsers");

    socketExport.on("onlineUsers", ({ onlineUsers }) => {
      console.log(onlineUsers, "called");
      props.adminLocationAction(onlineUsers);
    });
    // return () => {
    //   socketExport.off();
    //   props.history.push("/");
    // };
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
        {props.locations.map((loc) => (
          <MapShow lonlat={loc} />
        ))}
    </section>
  );
};

const mapStateToProps = (state) => {
  return { locations: state.locations };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ adminLocationAction, locationAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
