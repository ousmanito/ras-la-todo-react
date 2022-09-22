import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodos } from "../../redux";
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
    "lightpink",
    "lightblue",
    "lightgreen",
    "green",
    "royalblue",
    "aquamarine",
    "orange",
  ]; 
  const dispatch = useDispatch()
  const deleteTodo = (id) => {
    dispatch(deleteTodos(id))
  }
  return (
    <>
      {Object.keys(tasks).map((key) => {
        let day_color;
        let date = new Date(tasks[key].date);
        let now = new Date()
        if(date.getFullYear() == now.getFullYear()
          && date.getMonth() == now.getMonth()
          && date.getDate() == now.getDate() ) {
            var day_format = "Aujourd'hui"
        } 
        else if(
          date.getDate() - now.getDate() == 1
          && date.getFullYear() == now.getFullYear()
          && date.getMonth() == now.getMonth()
        ) {
          var day_format = "Demain"
        }
        else {
          var day_format = `${days[date.getDay()]} ${date.getDate()} ${
          months[date.getMonth()]
        } `;
        }       
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
        if(day_format == "Aujourd'hui") {
          day_color = 'green'
        } 
        else if(day_format == "Demain") {
          day_color = 'lightblue'
        }
        return (
          <div key={tasks[key].key} className="task-container">
            <div className="checkbox" onClick={() => deleteTodo(tasks[key].key)}></div>
            <h3>{tasks[key].title}</h3>
              <h5>{tasks[key].description}</h5>
            <div className="details">
              <p style={{ color: `${day_color}` }}>{day_format}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TaskItem;
