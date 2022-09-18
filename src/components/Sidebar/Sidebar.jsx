import React from "react";
import './Sidebar.css'
import timetable from "./timetable.png";
import email from "./email.png";
import term from "./term.png";
import flags from "./flags.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { todosSelectors } from "../../redux";

export const Sidebar = () => {
  const tasks = useSelector(todosSelectors.selectAll);
  let date = new Date();
  const dateCondition = (item) => {
    return (
      new Date(item.date).getDate() == date.getDate() &&
      new Date(item.date).getMonth() == date.getMonth() &&
      new Date(item.date).getFullYear() == date.getFullYear()
    );
  };
  const todayTasks = tasks.filter((task) => dateCondition(task));

  return (
    <div>
      <span className="sidebar">
        <ul>
          <ul>
            <li>
              <img src={email} alt="" />
              <Link to="all">
                <h4>Boite de réception</h4>
              </Link>
              <p>{tasks.length}</p>
            </li>
            <li>
              <img src={timetable} alt="" />
              <Link to="today">
                <h4>Aujourd'hui</h4>
              </Link>
              <p>{todayTasks.length}</p>
            </li>
            <li>
              <img src={term} alt="" />
              <Link to="today">
                <h4>Prochainement</h4>
              </Link>
            </li>
            <li>
              <img src={flags} alt="" />
              <Link to="today">
                <h4>Filtres et étiquettes</h4>
              </Link>
            </li>
          </ul>
        </ul>
      </span>
    </div>
  );
};
