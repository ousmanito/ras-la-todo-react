import React from "react";
import "./MainNavbar.css";
import axios from "axios";
import bars from "./bars.svg";
import home from "./home.svg";
import user from "./user.svg";
import logoutImg from "./logout.svg";
import { useState } from "react";
import { SearchDropDown } from "../SearchDropDown/SearchDropDown";

export const MainNavbar = (props) => {
  const [isSidebarOpen, setSidebar] = useState(props.isSidebarOpen);
  let root = document.querySelector(":root");

  const logout = () => {
    const userData =
      JSON.parse(localStorage.getItem("user_data")) ||
      JSON.parse(localStorage.getItem("user_details"));
    axios
      .post(
        "http://127.0.0.1:8000/api/auth/token/logout/",
        {
          username: userData.username,
          password: userData.password,
        },
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      )
      .then(() => {
        localStorage.clear();
        window.location.assign("/");
      })
      .catch((err) => {
        console.log(err)
      });
  };
  const toggleSidebar = () => {
    if (isSidebarOpen) {
      hideSidebar();
      setSidebar(!isSidebarOpen);
    } else if (!isSidebarOpen && window.innerWidth > 1000) {
      showSidebar();
      setSidebar(!isSidebarOpen);
    }
  };

  const showSidebar = () => {
    root.style.setProperty("--sidebar-width", "350px");
    document.querySelector("span.sidebar").classList.remove("hidden");
  };

  const hideSidebar = () => {
    root.style.setProperty("--sidebar-width", "0px");
    document.querySelector("span.sidebar").classList.add("hidden");
  };

 

  return (
    <div>
      <nav>
        <ul className="left_list">
          <li>
            <img
              src={bars}
              style={{ height: 67 }}
              onClick={toggleSidebar}
              alt=""
            />
          </li>
          <li>
            <img src={home} style={{ height: 67 }} alt="" />
          </li>
          <li>
           <SearchDropDown/>
          </li>
        </ul>

        <ul className="right_list">
          <li>
            <img src={user} style={{ height: 63 }} alt="" />
          </li>
          <li>
            <img
              src={logoutImg}
              onClick={logout}
              style={{ height: 54 }}
              alt=""
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};
