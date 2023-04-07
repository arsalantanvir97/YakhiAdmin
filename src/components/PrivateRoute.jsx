import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useRecoilValue } from "recoil";
import { adminInfo } from "../Recoil";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const adminData = useRecoilValue(adminInfo);
  return (
    <Route
      {...rest}
      render={(props) =>
        !adminData ? (
          <Redirect to="/" />
        ) : (
          <>
            <Header {...props}/>
            <Sidebar {...props}/>
            <Component {...props} />
          </>
        )
      }
    />
  );
};

export default PrivateRoute;
