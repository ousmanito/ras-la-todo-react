import React from "react";

const TaskItem = ({tasks}) => {
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
  return (
    <>
      {Object.keys(tasks).map((key) => {
        let day_color;
        let date = new Date(tasks[key].date);
        let day_format = `${days[date.getDay()]} ${date.getDate()} ${
          months[date.getMonth()]
        } `;
        switch (days[date.getDay()]) {
          default:
            day_color = "white";
            break;
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
        return (
          <div key={tasks[key].key} className="task-container">
            <div className="checkbox"></div>
            <h3>{tasks[key].title}</h3>
            <div className="details">
              <p style={{ color: `${day_color}` }}>{day_format}</p>
              <p>{}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TaskItem;
