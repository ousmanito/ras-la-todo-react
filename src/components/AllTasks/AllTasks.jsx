import axios from "axios";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import add from "../Tasks/add.png";
import "./AllTasks.css";

export default function AllTasks(props) {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
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
  todoList.sort((a,b) => {
    console.log(new Date(a.date_created) - new Date(b.date_created))
    return new Date(b.date_created) - new Date(a.date_created) 
  })
  
  function handleDateChange(e) {
    setDate(
      e.target.value
    )
  }
  function handleDescriptionChange(e) {
    setDescription(
      e.target.value
    )
  }
  function handleTitleChange(e) {
    setTitle(
      e.target.value
    )
  }
  function handleSubmit(e) {
    e.preventDefault()
    axios
    .post("http://127.0.0.1:8000/api/task/", {
      title: title,
      description: description,
      date: date
    }, {
      headers: {Authorization: `Token ${localStorage.getItem("token")}`}
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))

    
  }
  function handleCancel() {
    setShowAddMenu(!showAddMenu)
  }
 
  return (
    <div className="tasks">
      <h1>Bonjour, {"Ousmane"}</h1>
      <div className="add-task"  onClick={() => {
        setShowAddMenu(!showAddMenu)
      }}>
        <img src={add} alt="ADD" />
        <h3>Ajouter une nouvelle tâche</h3>
      </div>
      {showAddMenu === true && (
        <div className="add-menu">
          <div>
            <input type="text" placeholder="Titre" onChange={handleTitleChange}  />
          </div>
          <div>
            <textarea 
              name=""
              id=""
              cols="30"
              rows="5"
              placeholder="Description"
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
          <div className="date-menu">
            <button className="btn" style={{backgroundColor:'lightblue'}}><img src="" alt="" />Aujourd'hui</button>
            <button className="btn" style={{backgroundColor:'lightgreen'}}><img src="" alt="" />Demain</button>
            <input type="date" onChange={handleDateChange} />
          </div>
          <div>
            <button type="submit" className="btn" onClick={handleSubmit}>Ajouter</button>
            <button type="submit" className="btn" style={{backgroundColor:'red'}}  onClick={handleCancel}>Annuler</button>
          </div>
        </div>
      )}
      <div className="tasks">
        {todoList.map((task, index) => {
          let day_color;
          let date = new Date(task.date);
          let day_format = `${days[date.getDay()]} ${date.getDate()} ${
            months[date.getMonth()]
          } `;
          switch (days[date.getDay()]) {
            default:
              day_color = 'white'
              break
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
