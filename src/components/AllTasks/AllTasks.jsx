import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { fetchTodos, todosSelectors } from "../../redux";
import TaskItem from "../TaskItem/TaskItem";
import add from "../Tasks/add.png";
import "./AllTasks.css";

export default function AllTasks(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTodos())
  },[dispatch])
  const todoListe = useSelector(todosSelectors.selectAll)
  console.log(todoListe)
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  

  
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
      axios
      .get("http;//127.0.0.1:8000/api/task/", {
        headers: {Authorization: `Token ${localStorage.getItem('token')}`}
      })
      .then(res => {
      })
    })
    .catch(err => console.log(err))

    
  }
  function handleCancel() {
    setShowAddMenu(!showAddMenu)
  }
 
  return (
    <div className="tasks">
      <h1>Bonjour, {"Ousmane"}</h1>
      <h1>Boîte de réception</h1>
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
       <TaskItem tasks={todoListe}/>
      </div>
    </div>
  );
}
