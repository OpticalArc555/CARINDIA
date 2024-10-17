/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const DealerMiddleware = ({allowedRoles}) => {
    const location = useLocation();
    const toke = Cookies.get("toke");
  
    let jwtDecodes;
    if (toke) {
      jwtDecodes = jwtDecode(toke);
    }
  
      
        // Check if toke is expired
        const tokeExpirationTime = jwtDecodes.exp * 1000; // Convert to milliseconds
        const currentTime = Date.now();
        
        if (currentTime > tokeExpirationTime) {
            // If toke is expired, navigate to sign-in page
            return <Navigate to="/signin" />;
        }
    const userRole = toke ? jwtDecodes.authorities[0] : null;
    
    useEffect(() => {
      if (!allowedRoles.includes(userRole)) {
        return alert("You must be an dealer to access this page.");
      }
    }, [allowedRoles, userRole]);
    let content = allowedRoles.includes(userRole) ? (
      <Outlet />
    ) : (
      <Navigate to="/signin" state={{ from: location }} replace />
    );
  
    return <div>{content}</div>;
}

export default DealerMiddleware
