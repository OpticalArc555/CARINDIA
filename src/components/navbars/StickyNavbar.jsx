import React, { useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Link, useLocation } from 'react-router-dom';

import Cookies from "js-cookie";
import Profile from "../Profile/Profile";
import { jwtDecode } from "jwt-decode";

export function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);

  const token = Cookies.get("token");
  let jwtDecodes
  if(token){
     jwtDecodes = jwtDecode(token);
  }
  
  console.log(jwtDecodes);
  const userRole = token ? jwtDecodes?.authorities :null;

  const location = useLocation();
  const active = location.pathname === `/dealer/${jwtDecodes?.dealerId}`;
 
console.log(userRole)
  const adminDashboard = userRole?.includes("ADMIN") ? (
    <>
      <Link to={"/admin"}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-3 rounded-md font-normal ${window.location.pathname === "/admin" ? "bg-indigo-200 text-white" : ""}`}
        >
          Dealer List
        </Typography>
      </Link>
      <Link to={"/inspector"}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-3 rounded-md font-normal ${window.location.pathname === "/inspector" ? "bg-indigo-200 text-white" : ""}`}
        >
          Inspector List
        </Typography>
      </Link>
    </>
  ) : null;
  const dealerDashboard = userRole?.includes("DEALER") ? (
    <>
      <Link to={"/carlist"}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-3 rounded-md font-normal ${window.location.pathname === "/carlist" ? "bg-indigo-200 text-white" : ""}`}
        >
          Car List
        </Typography>
      </Link>
     
    
      <Link to={`/dealer/${jwtDecodes?.dealerId}`}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-3 rounded-md font-normal ${active ? "bg-indigo-200 text-white" : ""}`}
        >
          Dashboard
        </Typography>
      </Link>
      <Link to={`/dealer/${jwtDecodes?.dealerId}/allpending`} >
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-3 rounded-md font-normal ${window.location.pathname === `/dealer/${jwtDecodes?.dealerId}/allpending` ? "bg-indigo-200 text-white" : ""}`}
        >
          Pendig Request
        </Typography>
      </Link>
    
      <Link to={`/dealer/${jwtDecodes?.dealerId}/booking/confirm`}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-3 rounded-md font-normal ${window.location.pathname === `/dealer/${jwtDecodes?.dealerId}/booking/confirm` ? "bg-indigo-200 text-white" : ""}`}
        >
        Confirm Booking  
        </Typography>
      </Link>
    </>
  ) : null;
   const userDashboard = userRole?.includes("USER") ? (
    <>
      <Link to={`/pendinrequest/${jwtDecodes?.userId}`}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-3 rounded-md font-normal ${window.location.pathname === "/pendinrequest" ? "bg-indigo-200 text-white" : ""}`}
        >
          All Request
        </Typography>
      </Link>
      {/* <Link to={`/user/booking/${jwtDecodes?.userId}`}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-3 rounded-md font-normal ${window.location.pathname === `/user/booking/${jwtDecodes?.userId}` ? "bg-indigo-200 text-white" : ""}`}
        >
          Confirm Booking
        </Typography>
      </Link> */}
    </>
   ) : null;

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 p-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link to={"/"}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-3 rounded-md font-normal ${window.location.pathname === "/" ? "bg-indigo-200 text-white" : ""}`}
        >
          Home
        </Typography>
      </Link>
      {
        userRole == 'DEALER' ? null :<Link to={"/carlist"}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-3 rounded-md font-normal ${window.location.pathname === "/carlist" ? "bg-indigo-200 text-white" : ""}`}
        >
          Buy Car
        </Typography>
      </Link>
      }
      
      <Link to={"/bidding"}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-3 rounded-md font-normal ${window.location.pathname === "/bidding" ? "bg-indigo-200 text-white" : ""}`}
        >
          Live
        </Typography>
      </Link>
      {adminDashboard}
      {dealerDashboard}
      {userDashboard}

    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to={"/"}>
          <Typography className="mr-4 cursor-pointer py-1.5 font-medium">
            CarsForum
          </Typography>
        </Link>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <div className="flex items-center gap-x-1">
            {token ? (
              <Profile />
            ) : (
              <>
                <Link to="/signin">
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    <span>Sign In</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1">
          <Button fullWidth variant="text" size="sm" className="">
            <span>Log In</span>
          </Button>
          <Button fullWidth variant="gradient" size="sm" className="">
            <span>Sign in</span>
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}
