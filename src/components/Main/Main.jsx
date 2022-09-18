import React from "react";
import "./Main.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { MainNavbar } from "../MainNavbar/MainNavbar";
import { Sidebar } from "../Sidebar/Sidebar";

const Tasks = () => {
  let root = document.querySelector(":root");

  let [isSidebarOpen, setSidebar] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 1000) {
      if (isSidebarOpen) {
        document.querySelector("span.sidebar").classList.add("hidden");
        root.style.setProperty("--sidebar-width", "0px");
        setSidebar(!isSidebarOpen);
      } else if (!isSidebarOpen) {
      }
    } else if (window.innerWidth > 1000) {
    }
  }, []);

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 1000) {
      if (isSidebarOpen) {
        hideSidebar();
        setSidebar(!isSidebarOpen);
      } else if (!isSidebarOpen) {
      }
    } else if (window.innerWidth > 1000) {
    }
  });

  const hideSidebar = () => {
    root.style.setProperty("--sidebar-width", "0px");
    document.querySelector("span.sidebar").classList.add("hidden");
  };

  return (
    <>
      <div className="app-layout">
        <MainNavbar props={isSidebarOpen} />
        <div className="app-container">
         <Sidebar/>
          <span className="board">
            <div className="board-container">
              <Outlet />
            </div>
          </span>
        </div>
      </div>
    </>
  );
};
export default Tasks;
