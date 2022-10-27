import React from "react";
import "./Main.css";
import {useSelector} from "react-redux";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { MainNavbar } from "../MainNavbar/MainNavbar";
import { Sidebar } from "../Sidebar/Sidebar";
import ErrorPage from "../ErrorPage/ErrorPage";
import { store } from "../../redux.js"


const Tasks = () => {
  let root = document.querySelector(":root");
  let todoError = useSelector((state) => state.todos.error) 
  let categoryError = useSelector((state) => state.categories.error) 
  let taskCategoryError = useSelector((state) => state.taskCategories.error)
  const isError = todoError && categoryError && taskCategoryError
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
              {isError ? <ErrorPage /> : <Outlet />}
            </div>
          </span>
        </div>
      </div>
    </>
  );
};
export default Tasks;
