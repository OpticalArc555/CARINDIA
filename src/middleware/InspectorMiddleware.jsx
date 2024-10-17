/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
const InspectorMiddleware = ({ allowedRoles }) => {
  const location = useLocation();
  const toke = Cookies.get("toke");

  let jwtDecodes;
  if (toke) {
    jwtDecodes = jwtDecode(toke);
    
  }

  const userRole = toke ? jwtDecodes.authorities[0] : null;
  
  useEffect(() => {
    if (!allowedRoles.includes(userRole)) {
      return alert("You must be an Inspector to access this page.");
    }
  }, [allowedRoles, userRole]);
  let content = allowedRoles.includes(userRole) ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );

  return <div>{content}</div>;
};

export default InspectorMiddleware;
