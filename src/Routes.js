import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import AdminDashboard from "./admin/admin";
import Login from "./login/login";
import UserComponent from "./user/user";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
{
  /* <ToastContainer autoClose={5000} /> */
}

// import SearchPlayer from "./pages/SearchPlayer";

const Routes = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact component={Login} path="/" />
          <Route exact component={AdminDashboard} path="/admin" />
          <Route exact component={UserComponent} path="/staff" />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default Routes;
