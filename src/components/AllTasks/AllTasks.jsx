import React, { Component } from "react";
import { useOutletContext } from "react-router-dom";
import add from "../Tasks/add.png";
import { withRouter } from "../withRouter";
import "./AllTasks.css";


export default function AllTasks(props) {
  const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "indigo",
    "orange",
  ];
  let todoList = useOutletContext();

  return (
    <div className="tasks">
      <h1>Bonjour, {"Ousmane"}</h1>
      <div className="add-task">
        <img src={add} alt="ADD" />
        <h3>Ajouter une nouvelle tâche</h3>
      </div>
      <div className="tasks">
        {todoList.map((task, index) => {
          let day_color;
          let date = new Date(task.date);
          let day_format = `${days[date.getDay()]} ${date.getDate()} ${
            months[date.getMonth()]
          } `;
          switch (days[date.getDay()]) {
            case "Lun":
              day_color = colors[0];
              break;
            case "Mar":
              day_color = colors[1];
              break;
            case "Mer":
              day_color = colors[2];
              break;
            case "Jeu":
              day_color = colors[3];
              break;
            case "Ven":
              day_color = colors[4];
              break;
            case "Sam":
              day_color = colors[5];
              break;
            case "Dim":
              day_color = colors[6];
              break;
          }
          console.log(day_color);
          return (
            <div key={task.key} className="task-container">
              <div className="checkbox"></div>
              <h2>{task.title}</h2>
              <div className="details">
                <p style={{ color: `${day_color}` }}>{day_format}</p>
                <p>{}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
